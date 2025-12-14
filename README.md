# CineMax - Sistema de Reservas de Cine

Aplicación de gestión de reservas desarrollada con microservicios en Spring Boot y PostgreSQL.


## Iniciar Base de Datos

```bash
docker-compose up
```

> Si es la primera vez que se ejecuta el proyecto, usar:
>
> ```bash
> docker-compose up --build
> ```

 Detener servicios

>```bash
>docker-compose down
>```


También puedes iniciar los contenedores manualmente:

```bash
docker start db_usuarios
docker start db_peliculas
```

> En Linux, si hay errores por PostgreSQL local:
>
> ```bash
> sudo systemctl stop postgresql
> ```

---

## Limpieza y reconstrucción completa del entorno

Dado el caso de que de error al iniciar el docker de error **(esto se debe a que se hayan quedado contenedores o volúmenes colgados)**, usar este script para limpiar y reconstruir todo desde cero:
> ```bash
> # Limpieza completa
> docker-compose down -v
> docker system prune -a --volumes -f
> 
> # Si tienes PostgreSQL local corriendo, detenerlo
> sudo systemctl stop postgresql
> 
> # Verificar que no queden contenedores
> docker ps -a
> docker volume ls
> 
> # Reconstruir
> docker-compose up --build
> ```

## Verificar contenedores

```bash
docker ps
```

---

## Ver logs

```bash
docker logs servicio-usuarios
docker logs servicio-peliculas
docker logs servicio-reservas
```

---

## Comprobar APIs

**A través del Gateway (puerto 8080):**
- Usuarios →  http://localhost:8080/api/usuarios
- Películas → http://localhost:8080/api/peliculas
- Reservas →  http://localhost:8080/api/reservas


**Acceso directo a los microservicios:**
- Usuarios → [http://localhost:8081/usuarios](http://localhost:8081/usuarios)
- Películas → [http://localhost:8082/peliculas](http://localhost:8082/peliculas)
- Reservas → [http://localhost:8083/reservas](http://localhost:8083/reservas)



