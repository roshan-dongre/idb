GithubID = roshan-dongre
RepoName = idb
SHA      = c2387c9e85467deb5b1e88d2bf647bad09e3fdcf

githubid:
	@echo "${GithubID}"

reponame:
	@echo "${RepoName}"

sha:
	@echo "${SHA}"

# make github   - prints link to github repo
github:
	@echo "http://www.github.com/roshan-dongre/idb"

# make issues   - prints link to current phase's issues
issues:
	@echo "http://www.github.com/${GithubID}/${RepoName}/issues"

# make stories  - prints link to current phase's stories
stories:
	@echo "http://www.github.com/roshan-dongre/idb/blob/${SHA}/stories.txt"

# make uml      - prints link to uml diagram
uml:
	@echo "http://www.github.com/${GithubID}/${RepoName}/blob/${SHA}/UML.png"

# make selenium - runs selenium tests
selenium:
	python frontend/guitests.py

# make frontend - runs frontend tests
frontend: install
	echo "Results will be stored in mocha_results.txt"
	cd frontend && npm test | tee ../mocha_results.txt

# creating file to output mocha results
install:
	npm install
	touch mocha_results.txt

# make backend  - runs backend tests
backend:
	python backend/tests.py

# make website  - prints link to a website
website:
	@echo "http://ontherun.me/"

# make report   - prints link to technical report
report:
	@echo "https://roshan-dongre.gitbooks.io/report/"

# make apidoc   - prints link to api documentation
apidoc:
	@echo "https://roshan-dongre.gitbooks.io/api/"

# make self     - prints link to self critique
self:
	@echo "https://roshan-dongre.gitbooks.io/report/self-critique.html"

# make other    - prints link to other critique
other:
	@echo "http://roshan-dongre.gitbooks.io/report/other-critique.html"