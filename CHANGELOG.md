# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2021-03-15
- Added public catalog for an overview of all badge classes in edubadges.
- Adds multilanguage fields for Institution, Issuer Group & Issuer.
- Can now add multiple (max 8) Related Educational Frameworks to a badge class.
- Can now add narrative / evidence metadata when awarding an edubadge.
- MBO institutions can now select SBU instead of ECTS for study-load.
- Grading-table field is not a required field for MBO institutions.
- A badge class can be set private if you don't want it to be viewable in the badge class catalog.
- Backpack: The eduID is exposed completely.
- Backpack: Option to make the narrative/evidence metadata public or not.

## [2.1.3] - 2021-03-01
- Added listview in overview of badgeclasses.
- Added breadcrumbs on top of several pages.
- Added tooltips in add badgeclass metedata screen.

## [2.1.2] - 2021-02-11
 - Can now archive Issuer Groups when all assertions have been revoked.
 - Bugfix for showing the correct creation date for Badgeclasses.

## [2.1.1] - 2021-01-18
 - About link in the footer.
 - Git version page at /version/info
 - Changed validated name status in user profile.
 - Can now archive Issuers and Badgeclasses when all assertions have been revoked.
 - Added name check when creating a new badgeclass. If name already excists in issuer it will raise an error.
 - Bugfix for language of instruction in badgeclass metadata: will keep its state now.

## [2.1.0] - 2020-12-28
 - URL to the public institution page is added to the awarded edubadge.
 - Added markdown support for descriptions.
 - Students can view their validated name in their profile.
 - Multi language support for the institution. issuer group and issuer metadata.
 - The study load metadata (in ECTS or hours) is now visible in the overview of the formal badgeclasses and edubadges.
 - When an institution does not awards formal edubadges, the study load field is not available.
 - Added overview of requested edubadges in Manage screens.
 - Several bugfixes.
