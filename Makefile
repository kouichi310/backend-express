.PHONY: shell logs up

shell:
	docker exec -it express sh

logs:
	docker logs express -f

up:
	docker-compose up -d