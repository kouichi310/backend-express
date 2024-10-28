.PHONY: shell logs

shell:
	docker exec -it express sh

logs:
	docker logs express -f