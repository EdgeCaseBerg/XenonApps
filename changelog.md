Change log
===============================================================================

Change log notes and usage:

Please keep this file tidy. 80 character limit on each line for easy-reading in
terminal readers such as vim/nano. 

Releases are done using git flow release start and have a prefix string so all 
the release branch name needs to be is a version number. The prefix string for
release branches is "release/" The prefix string for tags is "xenon_apps_site_"

I'm using a coworkers styling for the changelog, which is using the release num
ber and then a list of features changed followed by two newlines before the nex
t release is documented. Including the commit hashes is my own styling for easy
reference to the git log or to the git show command.

To perform a release follow the steps:

If you have git flow installed:
```
$ git flow release start 0.2
$ vi|nano|subl changelog.md
Edit the changelog file to bump the version number and add any files
$ git flow release finish 0.2
$ git checkout master && git push origin master && git checkout develop
$ git push --tags
```

If you do not have git flow installed:
```
$ git checkout -b release/0.2
$ vi|nano|subl changelog.md
Edit the changelog file to bump the version number and add any files
$ git checkout master
$ git merge --no-ff release/0.2
$ git push origin master && git checkout develop
$ git tag -a xenon_apps_site_0.2
$ git push --tags
```

Releases
===============================================================================

Release 0.2
-------------------------------------------------------------------------------
	- Coming soon


Release 0.1
-------------------------------------------------------------------------------
	- Directory Structure as per Issue #1  (Commit 837d754)
	- Splash page being used as index page as per Issue #2 (Commit 44c849)
	- Initial license and readme file (Commit fecd55bc and 1888570)
	- Created Change log file (Commit 23e02c1)


-------------------------------------------------------------------------------