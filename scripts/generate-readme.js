#!/usr/bin/env node

/**
 * generate-readme.js
 *
 * Reads all event and submission files, generates the dashboard tables
 * in README.md between marker comments.
 *
 * Usage: node scripts/generate-readme.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const EVENTS_DIR = path.join(__dirname, '..', 'events');
const SUBMISSIONS_DIR = path.join(__dirname, '..', 'submissions');
const README_PATH = path.join(__dirname, '..', 'DASHBOARD.md');

const MARKERS = {
  eventTable: { start: '<!-- EVENT-TABLE-START -->', end: '<!-- EVENT-TABLE-END -->' },
  submissionTable: { start: '<!-- SUBMISSION-TABLE-START -->', end: '<!-- SUBMISSION-TABLE-END -->' },
  archiveTable: { start: '<!-- ARCHIVE-TABLE-START -->', end: '<!-- ARCHIVE-TABLE-END -->' },
};

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  try {
    return yaml.load(match[1]) || {};
  } catch (e) {
    return null;
  }
}

function findMdFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMdFiles(fullPath));
    } else if (entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
      files.push(fullPath);
    }
  }
  return files;
}

const STATUS_EMOJI = {
  discovered: '🔍', researching: '🔬', shortlisted: '⭐', approved: '✅',
  drafting: '📝', submitted: '📨', admitted: '🎉', rejected: '❌', closed: '🔒', archived: '🗄️',
};

const CFP_STATUS_EMOJI = { open: '🟢', closed: '🔴', unknown: '🟡' };

const SUBMISSION_STATUS_EMOJI = {
  draft: '📝', review: '👀', revision: '✏️', approved: '✅',
  ready: '🚀', submitted: '📨', accepted: '🎉', rejected: '❌',
  waitlisted: '⏳', archived: '🗄️',
};

function generateEventTable(events) {
  const active = events.filter(e =>
    !['rejected', 'closed', 'archived'].includes(e.status)
  );

  active.sort((a, b) => {
    const priority = { admitted: 0, approved: 1, shortlisted: 2, drafting: 3, submitted: 4, discovered: 5, researching: 6 };
    const pa = priority[a.status] ?? 7;
    const pb = priority[b.status] ?? 7;
    if (pa !== pb) return pa - pb;
    return (a.cfp_deadline || '9999').localeCompare(b.cfp_deadline || '9999');
  });

  const rows = [
    '| Status | Event | Date | Location | CFP | CFP Deadline | Tier |',
    '|--------|-------|------|----------|-----|--------------|------|',
  ];

  if (active.length === 0) {
    rows.push('| | *No active events. Run the discovery workflow to get started.* | | | | | |');
  }

  for (const e of active) {
    const status = `${STATUS_EMOJI[e.status] || '❓'} ${e.status || 'unknown'}`;
    const name = e.event_url ? `[${e.event_name || 'Unknown'}](${e.event_url})` : (e.event_name || 'Unknown');
    const fileLink = e._filePath ? ` [📄](${e._filePath})` : '';
    const date = e.start_date || 'TBD';
    const location = e.location || 'TBD';
    const cfp = `${CFP_STATUS_EMOJI[e.cfp_status] || '🟡'} ${e.cfp_status || 'unknown'}`;
    const deadline = e.cfp_deadline || 'TBD';
    const tier = e.tier ? `T${e.tier}` : '-';
    rows.push(`| ${status} | ${name}${fileLink} | ${date} | ${location} | ${cfp} | ${deadline} | ${tier} |`);
  }

  const stats = [
    `> 📊 **${active.length}** active events tracked`,
    `> | ⭐ ${active.filter(e => e.status === 'shortlisted').length} shortlisted | ✅ ${active.filter(e => e.status === 'approved').length} approved | 📝 ${active.filter(e => e.status === 'drafting').length} drafting | 📨 ${active.filter(e => e.status === 'submitted').length} submitted | 🎉 ${active.filter(e => e.status === 'admitted').length} admitted | 🔍 ${active.filter(e => e.status === 'discovered').length} discovered |`,
  ].join('\n');

  return `${stats}\n\n${rows.join('\n')}`;
}

function generateSubmissionTable(submissions) {
  const active = submissions.filter(s =>
    !['archived'].includes(s.status)
  );

  active.sort((a, b) => {
    const priority = { accepted: 0, submitted: 1, ready: 2, draft: 3, review: 4, revision: 5, rejected: 6 };
    const pa = priority[a.status] ?? 7;
    const pb = priority[b.status] ?? 7;
    return pa - pb;
  });

  const rows = [
    '| Status | Session | Event | Format | Level |',
    '|--------|---------|-------|--------|-------|',
  ];

  if (active.length === 0) {
    rows.push('| | *No submissions yet.* | | | |');
  }

  for (const s of active) {
    const status = `${SUBMISSION_STATUS_EMOJI[s.status] || '❓'} ${s.status || 'unknown'}`;
    const titleText = s.session_title || 'Untitled';
    const title = s._filePath ? `[${titleText}](${s._filePath})` : titleText;
    const event = s.event_id || 'Unknown';
    const format = s.session_format || '-';
    const level = s.session_level || '-';
    rows.push(`| ${status} | ${title} | ${event} | ${format} | ${level} |`);
  }

  return rows.join('\n');
}

function generateArchiveTable(events, submissions) {
  const archivedEvents = events.filter(e =>
    ['rejected', 'closed', 'archived'].includes(e.status)
  );
  const archivedSubs = submissions.filter(s =>
    ['rejected', 'archived'].includes(s.status)
  );

  const rows = [
    '| Type | Name | Status | Reason |',
    '|------|------|--------|--------|',
  ];

  if (archivedEvents.length === 0 && archivedSubs.length === 0) {
    rows.push('| | *No archived items.* | | |');
  }

  for (const e of archivedEvents) {
    const status = `${STATUS_EMOJI[e.status] || '🗄️'} ${e.status}`;
    rows.push(`| Event | ${e.event_name || 'Unknown'} | ${status} | ${e.rejection_reason || '-'} |`);
  }

  for (const s of archivedSubs) {
    const status = `${SUBMISSION_STATUS_EMOJI[s.status] || '🗄️'} ${s.status}`;
    rows.push(`| Session | ${s.session_title || 'Untitled'} | ${status} | - |`);
  }

  return rows.join('\n');
}

function replaceSection(readme, markerStart, markerEnd, content) {
  const startIdx = readme.indexOf(markerStart);
  const endIdx = readme.indexOf(markerEnd);
  if (startIdx === -1 || endIdx === -1) return readme;
  const before = readme.substring(0, startIdx + markerStart.length);
  const after = readme.substring(endIdx);
  return `${before}\n\n${content}\n\n${after}`;
}

function main() {
  const eventFiles = findMdFiles(EVENTS_DIR);
  const submissionFiles = findMdFiles(SUBMISSIONS_DIR);

  const repoRoot = path.join(__dirname, '..');

  const events = [];
  for (const file of eventFiles) {
    const fm = parseFrontmatter(fs.readFileSync(file, 'utf-8'));
    if (fm && (fm.event_id || fm.event_name)) {
      fm._filePath = path.relative(repoRoot, file);
      events.push(fm);
    }
  }

  const submissions = [];
  for (const file of submissionFiles) {
    const fm = parseFrontmatter(fs.readFileSync(file, 'utf-8'));
    if (fm && (fm.submission_id || fm.session_title)) {
      fm._filePath = path.relative(repoRoot, file);
      submissions.push(fm);
    }
  }

  if (!fs.existsSync(README_PATH)) {
    console.error('DASHBOARD.md not found');
    process.exit(1);
  }

  let readme = fs.readFileSync(README_PATH, 'utf-8');

  readme = replaceSection(readme, MARKERS.eventTable.start, MARKERS.eventTable.end, generateEventTable(events));
  readme = replaceSection(readme, MARKERS.submissionTable.start, MARKERS.submissionTable.end, generateSubmissionTable(submissions));
  readme = replaceSection(readme, MARKERS.archiveTable.start, MARKERS.archiveTable.end, generateArchiveTable(events, submissions));

  fs.writeFileSync(README_PATH, readme);
  console.log(`✅ Dashboard updated: ${events.length} events, ${submissions.length} submissions`);
}

main();
