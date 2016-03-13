list:
	@echo "deploy"
	@echo "install"


deploy:
	gulp build
	git pull
	pm2 startOrReload pm2.json
	pm2 list

install:
	npm install --production
