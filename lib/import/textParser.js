import { normalizeMonth, normalizeImportedResume } from './normalize';

const SECTION_HEADERS = {
    summary: /^(?:professional\s+summary|summary|profile|about\s+me|career\s+objective|objective|executive\s+summary)[\s:]*$/i,
    experience: /^(?:work\s+experience|professional\s+experience|experience|employment(?:\s+history)?|work\s+history|career\s+history)[\s:]*$/i,
    education: /^(?:education|academic(?:\s+background|\s+history|\s+qualifications)?|qualifications|academic\s+credentials)[\s:]*$/i,
    projects: /^(?:projects|personal\s+projects|technical\s+projects|key\s+projects|academic\s+projects)[\s:]*$/i,
    skills: /^(?:skills|technical\s+skills|core\s+competencies|technologies|tools\s+&?\s*technologies|expertise|technical\s+proficiencies)[\s:]*$/i,
    certificates: /^(?:certifications?|certificates?|licenses?|accreditations?|awards(?:\s+&?\s*achievements)?|achievements|honors)[\s:]*$/i,
    languages: /^(?:languages?|language\s+proficiency|spoken\s+languages)[\s:]*$/i,
};

const DATE_RANGE_REGEX = /\b((?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?[\s,]+)?\d{4}|\d{1,2}\/\d{4})\s*[-–—to]+\s*(Present|Current|Now|(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?[\s,]+)?\d{4}|\d{1,2}\/\d{4})\b/i;
const SINGLE_DATE_REGEX = /\b((?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?[\s,]+)?\d{4}|\d{1,2}\/\d{4})\b/i;

const COMMON_ROLES = [
    'developer', 'engineer', 'architect', 'manager', 'lead', 'designer', 'analyst',
    'consultant', 'administrator', 'specialist', 'director', 'intern', 'associate',
    'officer', 'scientist', 'technician', 'programmer', 'assistant', 'coordinator',
    'founder', 'co-founder', 'executive', 'supervisor'
];

function isHeading(line) {
    const clean = line.replace(/^[#*_\-\s]+|[#*_\-\s:]+$/g, '').trim();
    if (!clean || clean.length > 45) return null;

    for (const [key, regex] of Object.entries(SECTION_HEADERS)) {
        if (regex.test(clean)) return key;
    }
    return null;
}

function extractDates(text) {
    const rangeMatch = text.match(DATE_RANGE_REGEX);
    if (rangeMatch) {
        return {
            start: normalizeMonth(rangeMatch[1]),
            end: /present|current|now/i.test(rangeMatch[2]) ? '' : normalizeMonth(rangeMatch[2]),
            cleanedText: text.replace(rangeMatch[0], '').replace(/[|()]/g, ' ').trim(),
        };
    }
    const singleMatch = text.match(SINGLE_DATE_REGEX);
    if (singleMatch) {
        return {
            start: normalizeMonth(singleMatch[1]),
            end: '',
            cleanedText: text.replace(singleMatch[0], '').replace(/[|()]/g, ' ').trim(),
        };
    }
    return { start: '', end: '', cleanedText: text };
}

function cleanBullet(line) {
    return line.replace(/^[\s•*–—\-\d.)\]>]+\s*/, '').trim();
}

function parseContact(headerLines, allText) {
    const contact = {
        name: '',
        title: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        github: '',
        portfolio: '',
    };

    // Regex for contact fields across all text / header
    const emailMatch = allText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) contact.email = emailMatch[0];

    const phoneMatch = allText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}|\+?\d[\d\s-]{8,14}\d/);
    if (phoneMatch) contact.phone = phoneMatch[0].trim();

    const linkedinMatch = allText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);
    if (linkedinMatch) contact.linkedin = linkedinMatch[0];

    const githubMatch = allText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i);
    if (githubMatch) contact.github = githubMatch[0];

    const urlMatch = allText.match(/(?:https?:\/\/)(?!linkedin|github)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/i);
    if (urlMatch) contact.portfolio = urlMatch[0];

    // Find Name and Title from top lines
    const validLines = headerLines.filter(l => {
        const t = l.trim();
        if (!t) return false;
        if (contact.email && t.includes(contact.email)) return false;
        if (contact.phone && t.includes(contact.phone)) return false;
        if (t.includes('linkedin.com') || t.includes('github.com')) return false;
        if (/^(?:resume|curriculum\s+vitae|cv)$/i.test(t)) return false;
        return true;
    });

    if (validLines.length > 0) {
        // First valid line is usually the Name
        contact.name = validLines[0].replace(/^[#*_\-\s]+|[#*_\-\s]+$/g, '').trim();
    }

    if (validLines.length > 1) {
        const secondLine = validLines[1].replace(/^[#*_\-\s]+|[#*_\-\s]+$/g, '').trim();
        // Check if second line is a job title
        const isLikelyTitle = COMMON_ROLES.some(r => secondLine.toLowerCase().includes(r)) || secondLine.length < 50;
        if (isLikelyTitle && !secondLine.includes('@')) {
            contact.title = secondLine;
        } else if (!contact.address && /^[a-zA-Z\s]+,\s*[a-zA-Z\s]+/.test(secondLine)) {
            contact.address = secondLine;
        }
    }

    // Try finding address if still empty
    if (!contact.address) {
        const addressLine = headerLines.find(l => {
            const t = l.trim();
            return (
                !t.includes('@') &&
                !t.includes('http') &&
                /^[a-zA-Z\s.-]+,\s*[a-zA-Z\s.-]+(?:\s+\d{5})?/.test(t)
            );
        });
        if (addressLine) {
            contact.address = addressLine.trim();
        }
    }

    return contact;
}

function parseExperienceEntries(lines) {
    if (!lines || lines.length === 0) return [];

    const entries = [];
    let current = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const isBullet = /^[\s•*–—\-]|\d+\.\s/.test(line);
        const { start, end, cleanedText } = extractDates(line);
        const hasDate = Boolean(start || end);

        // Check if this line signals a new position entry
        const isHeaderLine = !isBullet && (hasDate || COMMON_ROLES.some(r => line.toLowerCase().includes(r)) || (!current && entries.length === 0));

        if (isHeaderLine && (hasDate || !current || current.bullets.length > 0)) {
            if (current) {
                entries.push(finalizeExperience(current));
            }
            current = {
                headerLines: [line],
                bullets: [],
                start,
                end,
            };
        } else if (current) {
            if (isBullet) {
                current.bullets.push(cleanBullet(line));
            } else if (current.bullets.length === 0 && current.headerLines.length < 3) {
                // Additional header line (e.g. company, dates, location)
                current.headerLines.push(line);
                if (!current.start && hasDate) {
                    current.start = start;
                    current.end = end;
                }
            } else {
                current.bullets.push(cleanBullet(line));
            }
        } else {
            // No current position yet, start one
            current = {
                headerLines: [line],
                bullets: [],
                start,
                end,
            };
        }
    }

    if (current) {
        entries.push(finalizeExperience(current));
    }

    return entries.filter(e => e.role || e.company || e.description);
}

function finalizeExperience(item) {
    let role = '';
    let company = '';
    let location = '';
    let start = item.start || '';
    let end = item.end || '';

    const allHeader = item.headerLines.join(' | ');

    // Extract dates if not already extracted
    if (!start) {
        const d = extractDates(allHeader);
        start = d.start;
        end = d.end;
    }

    // Split on delimiters like '|', '–', '-', ' at ', '@', ','
    for (const hLine of item.headerLines) {
        const withoutDate = hLine.replace(DATE_RANGE_REGEX, '').replace(SINGLE_DATE_REGEX, '').trim();
        const parts = withoutDate.split(/\s+[|•·]\s+|\s+at\s+|\s+@\s+/i).map(p => p.trim()).filter(Boolean);

        if (parts.length >= 2) {
            if (COMMON_ROLES.some(r => parts[0].toLowerCase().includes(r))) {
                role = role || parts[0];
                company = company || parts[1];
            } else {
                company = company || parts[0];
                role = role || parts[1];
            }
            if (parts.length >= 3 && !location) {
                location = parts[2];
            }
        } else if (!role || !company) {
            const commaParts = withoutDate.split(/,\s*/).map(p => p.trim()).filter(Boolean);
            if (commaParts.length >= 2) {
                if (COMMON_ROLES.some(r => commaParts[0].toLowerCase().includes(r))) {
                    role = role || commaParts[0];
                    company = company || commaParts[1];
                } else if (COMMON_ROLES.some(r => commaParts[1].toLowerCase().includes(r))) {
                    company = company || commaParts[0];
                    role = role || commaParts[1];
                } else {
                    if (!role) role = commaParts[0];
                    else if (!company) company = commaParts[0];
                }
            } else if (withoutDate) {
                if (!role && COMMON_ROLES.some(r => withoutDate.toLowerCase().includes(r))) {
                    role = withoutDate;
                } else if (!company) {
                    company = withoutDate;
                } else if (!role) {
                    role = withoutDate;
                }
            }
        }
    }

    // Fallback if role or company is empty
    if (!role && company) {
        role = company;
        company = '';
    }

    return {
        role: role.replace(/^[|•·,\s]+|[|•·,\s]+$/g, ''),
        company: company.replace(/^[|•·,\s]+|[|•·,\s]+$/g, ''),
        location,
        start,
        end,
        description: item.bullets.join('\n').trim(),
    };
}

function parseEducationEntries(lines) {
    if (!lines || lines.length === 0) return [];

    const entries = [];
    let current = null;

    const DEGREE_REGEX = /\b(bachelor|master|doctor|ph\.?d|b\.?s\.?|m\.?s\.?|b\.?tech|m\.?tech|b\.?e\.?|m\.?e\.?|associate|diploma|degree|high\s+school)\b/i;
    const INSTITUTION_REGEX = /\b(university|college|institute|school|academy|polytechnic)\b/i;

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) continue;

        const { start, end } = extractDates(line);
        const hasDate = Boolean(start || end);
        const hasDegree = DEGREE_REGEX.test(line);
        const hasInstitution = INSTITUTION_REGEX.test(line);

        if (hasDegree || hasInstitution || (hasDate && !current)) {
            if (current) {
                entries.push(finalizeEducation(current));
            }
            current = {
                lines: [line],
                start,
                end,
            };
        } else if (current) {
            current.lines.push(line);
            if (!current.start && hasDate) {
                current.start = start;
                current.end = end;
            }
        } else {
            current = {
                lines: [line],
                start,
                end,
            };
        }
    }

    if (current) {
        entries.push(finalizeEducation(current));
    }

    return entries.filter(e => e.degree || e.institution);
}

function finalizeEducation(item) {
    let degree = '';
    let institution = '';
    let gpa = '';
    let location = '';

    const DEGREE_REGEX = /\b(bachelor|master|doctor|ph\.?d|b\.?s\.?|m\.?s\.?|b\.?tech|m\.?tech|b\.?e\.?|m\.?e\.?|associate|diploma|degree|high\s+school)\b/i;
    const INSTITUTION_REGEX = /\b(university|college|institute|school|academy|polytechnic)\b/i;

    for (const l of item.lines) {
        const clean = l.replace(DATE_RANGE_REGEX, '').replace(SINGLE_DATE_REGEX, '').trim();

        const gpaMatch = l.match(/(?:gpa|cgpa|grade)[:\s]+([0-9.]+(?:\s*\/\s*[0-9.]+)?)/i);
        if (gpaMatch) gpa = gpaMatch[1];

        const parts = clean.split(/\s+[|•·]\s+/).map(p => p.trim()).filter(Boolean);
        for (const p of (parts.length > 1 ? parts : [clean])) {
            if (DEGREE_REGEX.test(p) && !degree) {
                degree = p;
            } else if (INSTITUTION_REGEX.test(p) && !institution) {
                institution = p;
            } else if (!degree && !institution) {
                institution = p;
            } else if (!degree) {
                degree = p;
            } else if (!location && /^[a-zA-Z\s]+,\s*[a-zA-Z\s]+/.test(p)) {
                location = p;
            }
        }
    }

    return {
        degree: degree.replace(/^[|•·,\s]+|[|•·,\s]+$/g, ''),
        institution: institution.replace(/^[|•·,\s]+|[|•·,\s]+$/g, ''),
        start: item.start || '',
        end: item.end || '',
        gpa,
        location,
    };
}

function parseProjectEntries(lines) {
    if (!lines || lines.length === 0) return [];

    const entries = [];
    let current = null;

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) continue;

        const isBullet = /^[\s•*–—\-]|\d+\.\s/.test(line);

        if (!isBullet && (!current || current.bullets.length > 0)) {
            if (current) entries.push(finalizeProject(current));
            current = { header: line, bullets: [] };
        } else if (current) {
            current.bullets.push(cleanBullet(line));
        } else {
            current = { header: line, bullets: [] };
        }
    }

    if (current) entries.push(finalizeProject(current));
    return entries.filter(e => e.title);
}

function finalizeProject(item) {
    let title = item.header;
    let url = '';

    const urlMatch = item.header.match(/(?:https?:\/\/|www\.)[^\s]+/i);
    if (urlMatch) {
        url = urlMatch[0];
        title = item.header.replace(url, '').replace(/[|()]/g, ' ').trim();
    }

    return {
        title: title.replace(/^[|•·,\s]+|[|•·,\s]+$/g, ''),
        url,
        description: item.bullets.join('\n').trim(),
    };
}

function parseCertificates(lines) {
    if (!lines || lines.length === 0) return [];

    return lines.map(line => {
        const { start, cleanedText } = extractDates(line);
        const parts = cleanedText.split(/\s+[|•·,-]\s+|\s+by\s+|\s+from\s+/i).map(p => p.trim()).filter(Boolean);

        return {
            title: (parts[0] || cleanedText).replace(/^[|•·,\s]+|[|•·,\s]+$/g, ''),
            issuer: (parts[1] || '').replace(/^[|•·,\s]+|[|•·,\s]+$/g, ''),
            date: start,
        };
    }).filter(c => c.title);
}

function parseLanguages(lines) {
    if (!lines || lines.length === 0) return [];

    return lines.map(line => {
        const clean = cleanBullet(line);
        const match = clean.match(/^([a-zA-Z\s]+)(?:[:\-(]\s*([a-zA-Z\s]+)\)?)?/);
        if (match) {
            return {
                language: match[1].trim(),
                proficiency: (match[2] || '').trim(),
            };
        }
        return { language: clean, proficiency: '' };
    }).filter(l => l.language);
}

/**
 * Main parse function: parses raw extracted resume text into
 * fully compliant Redux resume fields.
 */
export function parseResumeText(rawText, fileName = '') {
    if (!rawText || typeof rawText !== 'string') {
        return normalizeImportedResume({});
    }

    const allLines = rawText.split(/\r?\n/).map(l => l.trim());
    const sections = {
        header: [],
        summary: [],
        experience: [],
        education: [],
        projects: [],
        skills: [],
        certificates: [],
        languages: [],
    };

    let currentSection = 'header';

    for (let i = 0; i < allLines.length; i++) {
        const line = allLines[i];
        if (!line) continue;

        const detected = isHeading(line);
        if (detected) {
            currentSection = detected;
            continue;
        }

        sections[currentSection].push(line);
    }

    // If no summary was caught under heading, see if header has summary text
    let summaryText = sections.summary.join('\n').trim();
    if (!summaryText && sections.header.length > 3) {
        // Look for narrative paragraph in header
        const narrativeIndex = sections.header.findIndex((l, idx) => idx > 1 && l.length > 60);
        if (narrativeIndex !== -1) {
            summaryText = sections.header.slice(narrativeIndex).join(' ').trim();
            sections.header = sections.header.slice(0, narrativeIndex);
        }
    }

    const contact = parseContact(sections.header, rawText);
    const experience = parseExperienceEntries(sections.experience);
    const education = parseEducationEntries(sections.education);
    const projects = parseProjectEntries(sections.projects);
    const certificates = parseCertificates(sections.certificates);
    const languages = parseLanguages(sections.languages);

    // Skills
    let skillsString = sections.skills.join('\n').trim();
    if (!skillsString) {
        // Fallback: search common technical keywords in document
        const techKeywords = ['JavaScript', 'TypeScript', 'Python', 'Java', 'React', 'Next.js', 'Node.js', 'Redux', 'HTML', 'CSS', 'SQL', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git', 'REST API', 'GraphQL', 'Linux', 'Tailwind', 'Express', 'C++', 'C#'];
        const matched = techKeywords.filter(k => new RegExp(`\\b${k.replace('.', '\\.')}\\b`, 'i').test(rawText));
        if (matched.length > 0) {
            skillsString = matched.join(', ');
        }
    }

    // Safety fallback: If entire document had no headings (plain text document),
    // ensure ALL user content is preserved in summary or experience so nothing is lost!
    if (experience.length === 0 && education.length === 0 && !summaryText) {
        summaryText = allLines.slice(1).join('\n').trim();
    }

    const rawObj = {
        contact,
        summary: { summary: summaryText },
        experience,
        education,
        projects,
        skills: { skills: skillsString },
        certificates,
        languages,
    };

    return normalizeImportedResume(rawObj);
}
