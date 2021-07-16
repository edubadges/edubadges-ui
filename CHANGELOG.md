# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [4.2.0] - 2021-07-19
- Added missing date
- Updated dependency Acorn

## [4.1.0] - 2021-06-21
- Fixed date direct awarded in badgeclass award view.
- Disable direct awards if evidence or narraive is required.
- Added narative and evidence required option to the badgeclass.
- Fixed date issued on assertions.
- Updated dependencies.
- Updated the locales.

## [4.0.0] - 2021-05-31
- Fixed wrong header on terms non-formal badges.
- Updated several dependencies.
- Do not fail on no terms.
- Call for action for badges unclaimed.
- Show institution names on profile student.
- Non-formal badges can be awarded cross-institution.
- Badgeclass drives allowed institution.
- Added allowed institutions to badge class.
- Allow awarding and approval of badges of other institutions.
- Added eppn to assertions overview.
- Bugfix for no edit allowed.
- Bugfix for wrong permissioin commit.
- Added the Direct Award option to issue edubadges directly to students.
- Added an option to bulk upload direct awarded edubadges.
- Show institution names on profile student.

## [3.1.0] - 2021-05-03
- Updated ssri.
- Added public catalog for an overview of all badge classes in edubadges.\
- Show demo modal info.
- Add demo watermark for images in demo env.
- Fixed the issue that language settings metadata institution, issuergroup or issuer doesn't always show the chosen UI language setting.
- Narrative and evidence can be added seperately when awarding edubadges.
- The badgeclass awarded view has filtering options.
- Performance optimalization.
- Filter out institutions in the catalog without an institutionType.
- Fixed a multilanguage issue when changing metadata of an issuer.
- Added bilangual (EN/NL) metadata options (name, logo) on institution, issuergroup and issuer.
- Fixed issuergroup filtering option.
- Fixed the sorting and searching of faculties.
- Added search option in overview awarded edubadges.
- Updated some styling misplacements.
- Updated the maintenance page to include the catalog icon.
- Private edubadges cannot be downloaded anymore; you can only download public edubadges.
- Fixed layout on mobiles.
- Removed the 'Accept this edubadge' button when you already accepted that edubadge.
- Beta label now shows total count of public badge classes.
- Educational level in the filter options hides the unspecified.
- Fixed typo MBP in NL interface. Changed to MBO.

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
