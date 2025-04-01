# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [8.1.0] - 2025-04-01

Backend: https://github.com/edubadges/edubadges-server/compare/v8.0.1...v8.1.0</br>
Frontend: https://github.com/edubadges/edubadges-ui/compare/v.8.0.0...v8.1.0

- Updating dockerfile to run ui with static-web-server
- Use of existing correct regex for checking email address
- Set page count to 12 for pagination
- Refactored search for users attributes https://trello.com/c/zUeAmX3l/1058-zoeken-met-spatie-resulteert-in-geen-resultaten
- Added pagination for public issuer page
- Validate EPPN inbulk upload https://trello.com/c/ztNm4cRi/1037-if-wrong-eppn-format-is-used-with-bulk-upload-generic-error-is-shown
- 86e30WkS Fix for title export insights https://trello.com/c/86e30WkS/1039-export-graph-from-insights-as-pdf-or-png-has-no-title-but-just-states-chart-title
- Added Dockerfile for prod-like build, moved dev to dev.Dockerfile
- Create docker-image.yml
- Enable codeql-analysis.yml

## [8.0.0] - 2025-03-10

Backend: https://github.com/edubadges/edubadges-server/compare/v7.4.2...v8.0.0</br>
Frontend: https://github.com/edubadges/edubadges-ui/compare/V7.4.2...v8.0.0

- Minor locale changes: EQF/NLQF
- 1XcPzMWl: Optie wel tonen EQF/NLQF
- Trello eQ0oyJy4
- niet-alle-issuergroepen-en-issuers-worden-getoond trello U7nNt4ao

## [7.4.2] - 2025-02-19

#### Full GitHub changelogs:

Backend: https://github.com/edubadges/edubadges-server/compare/v7.4.1...v7.4.2</br>
Frontend: https://github.com/edubadges/edubadges-ui/compare/V7.4.1...v7.4.2

- Fix for undefined name institution
- Update CHANGELOG.md

## [7.4.1] - 2025-02-18

#### Full GitHub changelogs:

Backend: https://github.com/edubadges/edubadges-server/compare/v7.4.0...v7.4.1</br>
Frontend: https://github.com/edubadges/edubadges-ui/compare/V7.4.0...v7.4.1

- kwaliteitskader ipv kwaleitskader
- Bugfix for archived badges - M8uYvMsp
- Avoid undefined in institution.permissions
- Bugfix for Gi19IFS8
- Bugfix for Gi19IFS8
- Merge branch 'master' into develop
- Merge pull request #148 from edubadges/feature/users-performance
- Upgraded dom-purify
- Added number of permissions
- Count roles double
- Trying to get the count correct
- Updated changelog.md for release 7.4.0
- WIP for /users
- Merge branch 'develop' into feature/users-performance
- WIP for users
- WIP for performance users
- WIP for https://trello.com/b/eQ0oyJy4/do-edubadges

## [7.4.0] - 2025-02-17

#### Full GitHub changelogs:

Backend: https://github.com/edubadges/edubadges-server/compare/v7.3.1...v7.4.0</br>
Frontend: https://github.com/edubadges/edubadges-ui/compare/V7.3.1...v7.4.0

- Display super_user logo
- Added user endpoint
- WIP for Users
- Added new faculties page
- WIP for https://trello.com/c/FRjJrQJ4
- Differentiate between unclaimed and deleted zeroState
- Do not require token for catalog
- More strict (and complicated) email regexp
- WIP on catalog performance
- WIP on catalog raw query
- Merge pull request #145 from berkes/feature/import-unime-fix
- Merge pull request #143 from edubadges/feature/unvalidated-backpack-users-QBYKFZVm
- WIP for Badges homepage
- fix: Fix import unime dialog not showing the QR code
- Merge pull request #144 from berkes/feature/docker-config-fix
- WIP for more raw queries
- fix: Ensure that the version running in docker(compose) has the docker config.js
- New validate name page with redirect to eduID
- WIP for QBYKFZVm
- Use new UnclaimedDirectAwards for both views
- PoC for raw queries instead of graphQL
- New URLs for Croho and Crebo
- Some locale changes

## [7.3.1] - 2025-01-27

#### Full GitHub changelogs:

Backend: https://github.com/edubadges/edubadges-server/compare/v7.3.0...v7.3.1</br>
Frontend: https://github.com/edubadges/edubadges-ui/compare/V7.3.0...v7.3.1

- Changes in the locales for issuing on email address.
- Extend user search for institution name and role.
- https://trello.com/c/TRSJkbPt/988-foutmelding-uitreiken-via-priv%C3%A9-e-mailadres.
- Merge pull request #141 from edubadges/dependabot/npm_and_yarn/nanoid-3.3.8.
- Fix for https://trello.com/c/OdjsIznb/987-opvoeren-uren-extra-curriculaire-edubadge-ten-onrechte-verplicht.

## [7.3.0] - 2024-12-18

#### Full GitHub changelogs:

Backend: https://github.com/edubadges/edubadges-server/compare/v7.2.0...v7.3.0</br>
Frontend: https://github.com/edubadges/edubadges-ui/compare/V7.2.0...v7.3.0

- Added the option to award edubadges to learners using their mailaddress. This mailaddress should match the one used for eduID.
- Added an option to change the contact mailaddress of the institution.
- Changed mimimal SBU hours (for MBO only) to 80, in steps of 80 with a default of 240 SBU.
- Improved the options to issue on behalf of other organisations.
- New options in the issuergroup functionality to better support virtual organisations.
- Remodelled the placement of logo's of institution, issuergroup and issuer.
- Improved application performance by reducing UI-bundle size.
- Fixed bug when claiming edubadges from other organisations.

## [7.2.0] - 2024-11-13

- Bugfix for single value educationProgramIdentifier
- Refactored to run once
- Add metadata fields for SEO optimization
- Formatter
- Issue #964: direct-award-geen-check-onderwijsinstelling
- Added prov env variable and moved JS to svelte header
- Added script for piwik
- Updated some locals to end sentence with a dot
- feat: Move Linkedin button back to the top when we have import buttons.
- feat: Allow Wallet Import from multiple Agents.
- In anticipation of the catalog refactoring
- Issue #942 usecase-uitgeven-surf
- Dutch locale for faculty_type
- Issue #944 advanced-issuergroup-functionaliteit
- Fetch faculty type for badge class form
- Issue #940: Sector-kunnen-selecteren-in-de-issuergroup-case-aeres
- Fix voor criteria-text-wrong-formatting.

## [7.1.0] - 2024-10-10

- Ran npx browserslist@latest --update-db.
- Bugfix for invisble required fields MBO.
- Sanitize user input before rendering.
- Do not use archived in edubadges types in insights.
- Do not count archived in other types.
- Removed Link to full privacy statement.
- Op meerdere tags kunnen filteren.
- feat: Enable source maps in dev mode.
- chore: Suppress Unused CSS selector warnings.
- Save required extensions if not present.
- Hide the EQF filter in the catalog.
- Do not display EQF indication.
- Bump dompurify from 2.0.17 to 2.5.4.

## [7.0.0] - 2024-08-14

- test: Fix failing test after change to required attribute name.
- feat: Debug log the contents of the QR code before it's shown.
- Removed detail info for aligning specs badge-form.
- Only use studyload for MBO.
- Do not use StudyLoad for WO Micro badges.
- Add banner for system notifications.
- Allow for null Studyload values for MBO / Extra Curricular extensions.
- Fixed JS tests.
- Show type of badgeclaass in edit mode.
- TimeInvestmentExtension is optional for Extra Curricular.
- Minimum aantal uren MBO microcredential.
- Added country code to Issuer public page.
- Added extra optional fields for extra curriculaire badges.
- Force login after logout.
- Removed gradeAchievedRequired.
- Only show positive values for stackable and assessment info.
- Fix for switching institutions in insights.
- Added new performant query for requested edubadges.
- Refactored UI of badge tags.
- Added new performant query for requested edubadges.
- Typo fix for identity and supervision translation.
- Added Uitreiken aan niet gevalideerd persoon to EC badgeClass.
- Fix for Toezicht en identiteit verificatie.
- Refactored tags.
- Do not show badgeclass.gradeAchievedRequired.
- Fix for switching institutions in insights.
- On copy check legacy program identifiers.
- Bugfix for copy not working.
- Added NODE_OPTIONS=--openssl-legacy-provider.
- Updated Bewijs (URL) verplicht voor aanvraag?
- Changed badgeclass option selection text.
- Expose all badgeclass metadata on the public assertion page.
- Existing micro-credentials badges have empty QA.
- No English tekst for mbo.
- Bugfix for QA description regular.
- Participation is multi-value.
- Micro QA is not editable.
- Added Kwaliteitskader mbo.
- Changed type of learning activities.
- Modified type of assesments.
- Some changes on the locales.
- Multiple assessment types.
- Show dropdown for tags in badge class filter.
- Custom icon for issued at.
- Finished showing grade required.
- WIP for asking grades.
- WIP for grades.
- Aligned overview.
- Added extra fields on badge class overview.
- https://trello.com/c/RAx5s1rl/818-verplaatsen-toegestane-instellingen.
- Add schema to URL fields in new badge class.
- Grade required flow.
- Valid time extensions.
- Various small findings.
- Align URL validation server and ui.
- Filter not needed attributes.
- Validate URLs.
- WIP for null required attributes.
- Regular draft badge class programme idenitifier hint.
- Preview badge bugfix.
- Do not show switch load for regular.
- Client side validation.
- Show the reason why badge class option is not available.
- WIP for refactoring forms.
- Ensure preview modal is scrollable.
- WIP for preview.
- Added new attributes to badge overview.
- WIP for client side error rendering.
- WIP for Extra curricular badge class.
- Added status indicator draft.
- file placeholder.
- Position delete button.
- Toggle micro-credential framework.
- Micro-credential flow.
- Synced locals.
- WIP for new badge class forms.
- WIp for badge forms.
- Institution has badge class tags.
- WIP for regular form.
- Temporary solution for cope badge-class tip.
- Modal badge class chooser.
- First commit for new badge class forms.
- Added "nl.managementQueries.issuerMembers".
- Prevent edubadge not found while impersonating.
- Narrow search issuers.
- Management query for issuers.
- Bump follow-redirects from 1.15.4 to 1.15.6.
- Bump express from 4.18.2 to 4.19.2.
- Bump ws from 6.2.2 to 6.2.3.

## [6.10.0] - 2024-02-23

- Bump ip from 1.1.5 to 1.1.9.
- Removed the backpack download button.
- New URLfor CROHO register.
- Text changes to quality framework.
- Sort badgeclass status fix.
- Added Status unpublished.
- Performance indicator for management queries.
- Change text qualifications framework Microcredentials.
- Query for awarded backpacks.
- Bump browserify-sign from 4.0.4 to 4.2.2.
- Bump follow-redirects from 1.14.8 to 1.15.4.
- Prevent null-pointer.
- Style wallet popup modal.
- Added import wallet in badge-details.
- Update microcredentials.js - Removed footnote 1.
- Bump follow-redirects from 1.14.8 to 1.15.4.
- Micro-credentials badges.
- Added raw query for counts user / assertions.
- Bump browserify-sign from 4.0.4 to 4.2.2.

## [6.9.0] - 2023-10-23

- Added micro-credentials count query.
- Use Select for picking management query.
- Refactored management queries output to CSV.
- Differentiate zero-state open and denied enrollments.
- Added management queries and fixed award badges.
- Default do not show archived badgeclasses.
- Changed the view of the award-view.
- Added option to resend open direct awards.
- Show host name of the client.
- Moved endorsements to admin tab.
- Parse host name in version info page.
- Removed 'Ingetrokken voor toekenning' from insights.
- Deleted awards top level.
- Variable titles for assertions and requests.
- Refactoring of awarded badges.
- Deletion of unclaimed ddirect awards is now possible.
- Do not allow disabling self-registration when direct awards are disbaled.
- Differtiate between direct_awarded and self_request assertions.
- Don't check email address with direct awards.
- Re-enabled scheduling direct awards.
- Bump @babel/traverse from 7.7.2 to 7.23.2.
- Bump fsevents from 1.2.9 to 1.2.13.
- Bump postcss from 8.2.13 to 8.4.31.
- Bump tough-cookie from 4.0.0 to 4.1.3.
- Bump semver from 5.7.1 to 5.7.2.
- Bump word-wrap from 1.2.3 to 1.2.4
- Minor locale changes.

## [6.8.1] - 2023-06-29

- fix problem with remote image.
- Do not use remote image.
- Make the resend button visible again.
- Bugfix Badgeclass type microcredential.
- Bugfix for copy microcredential.
- Default to all institutions.

## [6.8.0] - 2023-06-05

- Disabled scheduling direct awards.
- Minor locale changes.
- Only bring focused select in foreground.
- Only allow teacher pages to teachers.
- Dropdown taal create badge bugfix.
- Date reminder.
- Fixed broken NLQF URL.
- Feature toggle for including SURF badges.
- If SIS integration is enabled, offer a copy entity_id option.
- Sorting insights drop downs.
- Bugfix for wrong issuedOn date.
- Fixed Sorting bugs.
- Bugfix for micro-credentials switch.
- Bugfix for no input programme identifier.
- Initialize award-date at coming midnight.
- Temporary disable production mode for debugging optional chaining.
- Show scheduled direct awards in the overview.
- Fix for sorting assertions.
- Allow for scheduled DA's in bulk award.
- Searching unclaimed direct awards applies to filter.
- Resend unclaimed direct awards.
- Reset filter after revocation.
- Only select the shown unclaimed direct awards for selectAll.
- Ensure the programme identifier is required when Credit points are specified.
- client side for allowing more then one program identifier.
- Filter option in overview unclaimed direct awards.
- Changed Tijdsinvestering to Tijd investering.

## [6.7.0] - 2023-02-27

- Removed debugger statement.
- Bugfix for direct award with incomplete URL.
- Wiki URL changed.
- Bugfix for awarding revokes badges.
- Minor locales changes.
- Claim rate bugfix.
- Use window.location.hostname in linkedin URL.
- Always show the linkedin button.
- Align buttons.
- Added linkedin button for public badges.
- Moved badge class type up in insights.
- Bugfix for highcharts empty array.
- Bugfix for no awarded badges.
- Added missing badgeClassType: "Type edubadge".
- learning outcome changed to learning outcomes.
- Bugfix for not saving eqf extension for micro-credentials badgeclass.
- Insights type badgeClass.
- Ask the user for revalidation of the name.

## [6.6.0] - 2023-01-16

- Bugfix for undefined code.
- Bugfix unknown error revoke a Direct Award.
- Bump express from 4.17.1 to 4.18.2.
- Hide, not show main content if menu is open.
- Larger menu-items on mobile.
- Improved mobile friendly backpack.
- Bump decode-uri-component from 0.2.0 to 0.2.2.
- Bugfix for collections.
- Fixed layout.
- View for unclaimed direct awards.
- Bugfix for undefined in direct award.
- Bugfix for ignoring alternativeIdentifier of institution.

## [6.5.0] - 2022-10-31

- Filter out revoked badges in the public count.
- Sum of Award type Direct Award/Requested not always correct.
- Another typo in null faculty names.
- Typo in null issuer names.
- Insights: null value due to missing language.
- Ignore data analyse of insights.
- Copy EQF value if badge class is copied.
- Modified Insights and the displayed numbers.
- Removed tooltips on each label in insights.
- Do not show institutions in insights if not super user.
- Changed insights table header.
- Group extra options in edit badgeclass screen.
- Minor changes on the locales.
- Replaced node-sass with sass.
- Added revoked before.
- Bugfix for claimrates.
- Synced locales.
- Added tests for minMaxDateOfAssertionSeries.
- Super users can select institutions in the insights.
- Group extra options in edit badgeclass screen.
- Bump minimist from 1.2.5 to 1.2.6.
- Bump async from 2.6.3 to 2.6.4.
- Bump eventsource from 1.0.7 to 1.1.1.
- Bump jsdom from 16.4.0 to 16.7.0.
- Bump moment from 2.24.0 to 2.29.4.
- Bump svelte from 3.23.2 to 3.49.0.
- Bump terser from 4.4.0 to 4.8.1.
- Bugfix for total number of awarded in insights.
- Bugfix for broken validation.

## [6.4.0] - 2022-08-22

- Do not commit insights.
- Detect used emails in direct awards.
- Badgclass option to disable Invite people to enroll.
- Added 300 dpi note to locales.

## [6.3.0] - 2022-07-18

- A change of email of the eduID account will now show in your profile.
- Minor Locale changes.
- After build favicon.ico changed.
- Changing issuername is now allowed even if edubadges have been awarded.
- Fixed bug using studyload field when institution doesn't support formal edubadges.
- Fixed bug to issue same badgeclass to same receipient only once when using Direct Award.
- Fixed narrative bug that also asks to fill in the evidence fields.
- Added endorsement functionality.
- Endorsements behind feature toggle.
- Ensure no duplicates endorsements are created.
- Retrieve badge class endorsements.
- Show endorsements on public badge class page.
- Do not show empty tabs for endorsements.
- Show accepted endorsements on public badge class page.
- Only show accepted endorsements.
- Translate names for endorsements on public page.
- Added support for pagination to display long lists.
- Badges that are expired can not be rejected.
- Fixed archived badgeclasses should not be requested by learners.
- Hack to fix svg problem in Safari.
- Defensive coding for misconfigured badges.
- Added an option to award requested edubadges over multiple badgeclasses.

## [6.2.0] - 2022-05-16

- Empty alignment URL placeholder for micro-credentials badgeclass.
- Added English text to the Pilot Microcredentials framework.
- Studyload is a value between 3-30 when pilot microcredentials is checked.
- Related educational framework URL is optional when pilot microcredentials is checked.
- Added more languages of instructions.
- Added read more at the description of the related educational framework.
- Extra filter type edubadges also in badclass screen.
- Opleidingscode -> Indicatief EQF.
- Bugfix for micro-credential badge form.
- Changed NLQF to EQF.
- Minor locale changes.
- Added even more lines to the framework template for the microcredentials pilot.
- Synced default languages for institution with server enum.
- Ability to disable direct awards for badge classes.
- Ensure swithcing to micro credentials get default values.
- Show revocation reason on badge instance.
- Show issuerGroups and issuers filters when an institution is selected.
- Added new filter badge class type in catalog.
- Default institution language for default instructions in new badge class.
- Complex toggle's because of micro-services pilot.
- Allow requests for badgeclasses from an institution with the correct alternative identifier.
- Bugfix for criteria text is null in markdown field.

## [6.1.0] - 2022-03-21

- Align items center in table header.
- Added notifications to get informed when an edubadge is requested.
- Ensure all is checked when all are checked.
- Show all badge classes that may be awarded by user and why.
- Show description, url from enrollment.
- Use narrative and url from enrollment for evidence badgeclass.
- Added onBehalfOf link on badge class / assertion.
- Fetch on behalf fields for faculty.
- Fallback to empty array for issuers.
- Updated locales.
- Updated url-parse from 1.5.3 to 1.5.10, follow-redirects from 1.14.7 to 1.14.8.

## [6.0.0] - 2022-02-21

- Option added to issuer groups to make awarding on behalf of (consortia) possible.
- Study load metadatafield in the badgeclass can not have the value '0'.
- Several interface additions to support LTI connections to a LMS.
- Added markdown WYSIWYG editor to badgeclass metadata input fields.
- Added option to set permissions for multiple badgeclasses.
- We don't show the pending status for awarded self enrolled edubadges.
- Made it possible to copy a badgeclass within the current issuer.
- Several small changes in the locales.
- Updated dependencies postcss, bump, nanoid, marked, follow-redirects.

## [5.4.0] - 2022-01-17

- Narrative supports markdown.

## [5.3.0] - 2021-12-20

- Requested badges have status awarded if not rejected or revoked.
- Minor changes in the locales.
- Enable adding alignment for badgeclass with assertions.
- Badgeclass with not revoked assertions is limited updateable.
- Bugfix for show more (and not displays 0 values).

## [5.2.0] - 2021-11-15

- Hide SURF welcome awarded badges.
- No default studyload if in copy-mode.
- Check for publicInstitutions.
- If isCopy then allow save.
- Copy badge class when there are editable issuers.
- Added deny_reason to enrollment.
- Proxy call to validator git info.
- Added backpack user count to insights.
- Changed validation of imported badges.
- Bugfix for my permisssions.
- Duplicated imports are not allowed.

## [5.1.0] - 2021-10-18

- Badgeclass metadata now shows a list of other institutions that could be awarded to. Only in the manage screens, not in the public badgeclass.
- Added the deletion of an issuerportal user, but only when this user hasn't issued any edubadges yet.
- Changed badgeclass metadata logic when an institution only awards the formal type of edubadges.
- Added support for SVG images in the badgeclass.
- Added insights functionality: a dashboard showing statistics about awarded edubadges and badgeclasses.
- Added import functionality to import other hosted open badges in your backpack.
- Added option to award non-formal edubadge to an user with no validated name.
- Added new roles issuer group admin, issuer group awarder, issuer admin, issuer awarder.
- Added archive badgeclass option when no open Direct Awards and no open enrollments are present.
- Refactored student bread crumbes.
- Added evidence and narrative option for bulk awarding.
- Added collections function to backpack.
- Changed error keys for English combined with Dutch.
- Added catalog menu option to backpack.
- Updated dependencies tar, tmpl.

## [5.0.0] - 2021-08-30

- Show required attributes for awarding enrollments.
- Added feedback dialog.
- Show spinner when busy.
- Added label with number of outstanding badge requests.
- Show revoked number of direct awards in overview.
- Only show one of the studyload types depending on the institution.
- Default sort by most requested.
- Added show denied checkbox for enrollments.
- Refactored framework alignment.
- Word break none for time investment label.
- New extension TimeInvestment.
- Show denied enrollments.
- Changed layout date issued in backpack.
- Styled badge class details.
- Breadcrumb for new badgeclass - and do not fetch all issuers.
- Do not show first trash can for alignments.
- Bugfix for not showing placeholder Allowed institutions in new badgeclass.
- Non-formal badges can be awarded to users with validated name.
- Updated dependencies url-parse, path-parse, tar, minimist.

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
