Title: On regulation in software engineering
Date: 2024-07-21
Category: Software
Tags: software-engineering, politics
Slug: on-regulation-in-software-engineering

Emergency services, GPs, hospitals, transportation systems and the like
are funded, at least in part, by public money. When their computer
systems go down, the public is badly affected and people can get hurt,
and lives can be put at risk. So what regulations and quality controls
are there on companies that provide these software services?

For disclosure: I do not provide, and have not ever provided, such
services to any public sector organization. But if I were negligent and
my software caused damage to expensive lab equipment, I might, quite
rightly, receive disciplinary or at least remedial action from my
employer. And if somebody got hurt, there might be criminal
consequences. And that might be sufficient incentive to the individual
engineer within a smallish organisation, but it doesn't affect the
fundamental problem that the software engineering 'discipline' is,
generally speaking, not particularly disciplined when it comes to
quality control, testing, documentation and other best practices.

Modern computer systems are very complex, so it is natural that issues
arise, but the same can be said for other areas of engineering which are
better regulated. Many software engineers (myself included) are
self-taught and have no qualification or formal training -- only the
good fortune to have worked with, and learnt from, excellent colleagues.
This is not a bad thing, as it makes the field accessible and allows
talent to join the industry, but without oversight, it allows bad
practices to proliferate.

I can't comment on the particulars of [the latest
outage](https://en.wikipedia.org/wiki/2024_CrowdStrike_incident) because
I don't know what happened, although it is good to know that
[CrowdStrike are already performing a root cause
analysis](https://www.crowdstrike.com/blog/falcon-update-for-windows-hosts-technical-details/)
([archive](https://web.archive.org/web/20240720170853/https://www.crowdstrike.com/blog/falcon-update-for-windows-hosts-technical-details/))
on the incident. But with an outage of this scale that affects so many
sectors, there does need to be some accountability to the public, and
'we fired the individual who wrote that code' and 'our stock price
crashed' aren't enough to change the broader culture in the discipline
and prevent similar outages from happening again at some other company.

Regulations must not become mere box-ticking exercises, but if
implemented effectively, they make service providers accountable to
taxpayer. But they are good for engineers too. They force us to think
about engineering quality. *Things that we know we should be doing* but
often neglect, either because (a) we have tight deadlines or (b) they
are boring. We don't like to admit this, but this is often a reason for
poor documentation. But they should really be factored in the cost of
software development.  For all its flaws, GDPR was a step in the
right(ish) direction; companies and engineers have been made to consider
the consequences of their work pertaining to data handling.

*This post is motivated by the ongoing CrowdStrike outage, but pertains
to software engineering in general, not to the particulars of this
incident. As with all other content on this blog, it expresses my
opinions, not those of my employer.*
