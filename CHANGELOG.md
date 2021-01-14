# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
