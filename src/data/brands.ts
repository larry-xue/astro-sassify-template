/**
 * Placeholder brands used across the template.
 *
 * Both lists deliberately use abstract Lucide marks rather than real company
 * logos. Real logos here would claim customers and partners that do not exist,
 * hand a trademark problem to everyone who downloads the template, and add a
 * third-party CDN request to every page load. Swap in an <img> once you have
 * permission from an actual customer.
 *
 * `icon` is any name from https://lucide.dev.
 */

/** The "trusted by" row in the hero. */
export const customers = [
  { name: 'Northgate', icon: 'lucide:hexagon' },
  { name: 'Basalt', icon: 'lucide:layers' },
  { name: 'Quorum Labs', icon: 'lucide:orbit' },
  { name: 'Meridian', icon: 'lucide:globe' },
]

/** The integrations page. Names describe the category, not a vendor. */
export const integrations = [
  { name: 'Team chat', icon: 'lucide:message-square', hue: 300,
    body: 'Post updates into a channel, and let people reply without leaving it.' },
  { name: 'Workspace suite', icon: 'lucide:calendar-days', hue: 250,
    body: 'Sync calendars, pull in documents, and export reports where your team already looks.' },
  { name: 'CRM', icon: 'lucide:contact', hue: 200,
    body: 'Keep customer records in step, in both directions, without a nightly job.' },
  { name: 'Source control', icon: 'lucide:git-branch', hue: 25,
    body: 'Link releases to the commits that shipped them, and back again.' },
  { name: 'Design tools', icon: 'lucide:pen-tool', hue: 330,
    body: 'Pull the latest frames straight into a page, so nobody ships last month.' },
  { name: 'Issue tracking', icon: 'lucide:kanban', hue: 168,
    body: 'Raise, move and close issues from inside the product.' },
]
