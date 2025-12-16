// ========== CONFIGURACIÓN ==========
const API_URL = 'http://localhost:8080/api';
let currentUser = null;

// ========== INICIALIZACIÓN ==========
window.onload = function() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUI();
    }
    loadMovies();
};

// ========== NAVEGACIÓN ENTRE SECCIONES ==========
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

function showLogin() {
    showSection('loginSection');
}

function showRegister() {
    showSection('registerSection');
}

function showMovies() {
    showSection('moviesSection');
    loadMovies();
}

function showReservations() {
    if (!currentUser) {
        showAlert('Debe iniciar sesión para ver sus reservas', 'error');
        showLogin();
        return;
    }
    showSection('reservationsSection');
    loadUserReservations();
}

// ========== ACTUALIZAR UI SEGÚN USUARIO ==========
function updateUI() {
    if (currentUser) {
        document.getElementById('userDisplay').textContent = `${currentUser.nombre} (${currentUser.rol})`;
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'inline-block';

        // Mostrar panel de admin si es ADMIN
        if (currentUser.rol === 'ADMIN') {
            document.getElementById('adminControls').style.display = 'block';
        }

        showMovies();
    } else {
        document.getElementById('userDisplay').textContent = 'No ha iniciado sesión';
        document.getElementById('loginBtn').style.display = 'inline-block';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('adminControls').style.display = 'none';
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUI();
    showMovies();
    showAlert('Sesión cerrada exitosamente', 'success');
}

// ========== SISTEMA DE ALERTAS ==========
function showAlert(mensaje, tipo = 'success') {
    const container = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = `alert alert-${tipo}`;
    alert.textContent = mensaje;
    container.appendChild(alert);

    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// ========== LOGIN ==========
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/usuarios`);

        if (!response.ok) {
            throw new Error('Error al conectar con el servidor');
        }

        const usuarios = await response.json();
        const usuario = usuarios.find(u => u.email === email && u.password === password);

        if (usuario) {
            currentUser = usuario;
            localStorage.setItem('currentUser', JSON.stringify(usuario));
            updateUI();
            showAlert(`¡Bienvenido ${usuario.nombre}!`, 'success');
            e.target.reset();
        } else {
            showAlert('Email o contraseña incorrectos', 'error');
        }
    } catch (error) {
        console.error('Error en login:', error);
        showAlert('Error de conexión con el servidor', 'error');
    }
});

// ========== REGISTRO ==========
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = {
        nombre: document.getElementById('regNombre').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
        rol: 'USER'
    };

    try {
        const response = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        });

        if (response.ok) {
            showAlert('Usuario registrado exitosamente. Ahora puede iniciar sesión.', 'success');
            e.target.reset();
            showLogin();
        } else {
            const errorData = await response.text();
            showAlert(`Error al registrar usuario: ${errorData}`, 'error');
        }
    } catch (error) {
        console.error('Error en registro:', error);
        showAlert('Error de conexión con el servidor', 'error');
    }
});

// ========== CARGAR PELÍCULAS ==========
async function loadMovies() {
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = '<div class="loading">Cargando películas</div>';

    try {
        const response = await fetch(`${API_URL}/peliculas`);

        if (!response.ok) {
            throw new Error('Error al cargar películas');
        }

        const peliculas = await response.json();

        if (peliculas.length === 0) {
            moviesList.innerHTML = `
                <div class="empty-state">
                    <h3>No hay películas disponibles</h3>
                    <p>Aún no se han agregado películas al sistema</p>
                </div>
            `;
            return;
        }

        const html = peliculas.map(p => {
            const isAdmin = currentUser && currentUser.rol === 'ADMIN';
            const canReserve = currentUser !== null;

            return `
                <div class="movie-card">
                    <h3>${p.titulo}</h3>
                    <p><strong>Director:</strong> ${p.director}</p>
                    <p><strong>Género:</strong> ${p.genero}</p>
                    <p><strong>ID:</strong> ${p.id}</p>

                    ${canReserve ?
                        `<button onclick="reserveMovie(${p.id})">Reservar Entrada</button>` :
                        `<button disabled title="Debe iniciar sesión">Inicie sesión para reservar</button>`
                    }

                    ${isAdmin ? `
                        <div class="movie-actions">
                            <button class="btn-secondary" onclick="editMovie(${p.id}, '${p.titulo.replace(/'/g, "\\'")}', '${p.director.replace(/'/g, "\\'")}', '${p.genero.replace(/'/g, "\\'")}')">
                                Editar
                            </button>
                            <button class="btn-danger" onclick="deleteMovie(${p.id})">
                                Eliminar
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        moviesList.innerHTML = html;

    } catch (error) {
        console.error('Error al cargar películas:', error);
        moviesList.innerHTML = `
            <div class="empty-state">
                <h3>Error al cargar películas</h3>
                <p>No se pudo conectar con el servidor. Verifique que el backend esté activo.</p>
            </div>
        `;
    }
}

// ========== RESERVAR PELÍCULA ==========
async function reserveMovie(peliculaId) {
    if (!currentUser) {
        showAlert('Debe iniciar sesión para hacer una reserva', 'error');
        showLogin();
        return;
    }

    const precioBase = 15000;

    const reserva = {
        idUsuario: currentUser.id,
        idPelicula: peliculaId,
        precioTotal: precioBase,
        fechaReserva: new Date().toISOString()
    };

    try {
        const response = await fetch(`${API_URL}/reservas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reserva)
        });

        if (response.ok) {
            showAlert('¡Reserva creada exitosamente!', 'success');
        } else {
            const errorData = await response.text();
            showAlert(`Error al crear reserva: ${errorData}`, 'error');
        }
    } catch (error) {
        console.error('Error al reservar:', error);
        showAlert('Error de conexión con el servidor', 'error');
    }
}

// ========== CARGAR RESERVAS DEL USUARIO ==========
async function loadUserReservations() {
    const reservationsList = document.getElementById('reservationsList');
    reservationsList.innerHTML = '<div class="loading">Cargando reservas</div>';

    try {
        // Cargar todas las reservas
        const resResponse = await fetch(`${API_URL}/reservas`);
        const todasReservas = await resResponse.json();

        // Filtrar por usuario actual
        const misReservas = todasReservas.filter(r => r.idUsuario === currentUser.id);

        if (misReservas.length === 0) {
            reservationsList.innerHTML = `
                <div class="empty-state">
                    <h3>No tienes reservas</h3>
                    <p>Aún no has realizado ninguna reserva</p>
                </div>
            `;
            return;
        }

        // Cargar información de películas
        const pelResponse = await fetch(`${API_URL}/peliculas`);
        const peliculas = await pelResponse.json();

        const html = misReservas.map(r => {
            const pelicula = peliculas.find(p => p.id === r.idPelicula);
            const fecha = new Date(r.fechaReserva).toLocaleString('es-CO');

            return `
                <div class="reservation-card">
                    <h4>Reserva #${r.id}</h4>
                    <div class="reservation-info">
                        <p><strong>Película:</strong> ${pelicula ? pelicula.titulo : 'Desconocida'}</p>
                        <p><strong>Fecha:</strong> ${fecha}</p>
                        <p><strong>Precio:</strong> $${r.precioTotal.toLocaleString('es-CO')}</p>
                    </div>
                </div>
            `;
        }).join('');

        reservationsList.innerHTML = html;

    } catch (error) {
        console.error('Error al cargar reservas:', error);
        reservationsList.innerHTML = `
            <div class="empty-state">
                <h3>Error al cargar reservas</h3>
                <p>No se pudo conectar con el servidor</p>
            </div>
        `;
    }
}

// ========== MODAL DE PELÍCULA ==========
function showAddMovie() {
    document.getElementById('modalTitle').textContent = 'Agregar Película';
    document.getElementById('movieForm').reset();
    document.getElementById('movieId').value = '';
    document.getElementById('movieModal').classList.add('active');
}

function editMovie(id, titulo, director, genero) {
    document.getElementById('modalTitle').textContent = 'Editar Película';
    document.getElementById('movieId').value = id;
    document.getElementById('movieTitulo').value = titulo;
    document.getElementById('movieDirector').value = director;
    document.getElementById('movieGenero').value = genero;
    document.getElementById('movieModal').classList.add('active');
}

function closeMovieModal() {
    document.getElementById('movieModal').classList.remove('active');
    document.getElementById('movieForm').reset();
}

// ========== GUARDAR PELÍCULA (CREAR/EDITAR) ==========
document.getElementById('movieForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('movieId').value;
    const pelicula = {
        titulo: document.getElementById('movieTitulo').value,
        director: document.getElementById('movieDirector').value,
        genero: document.getElementById('movieGenero').value
    };

    try {
        let response;

        if (id) {
            // Editar (usar PUT si está implementado en el backend)
            pelicula.id = parseInt(id);
            response = await fetch(`${API_URL}/peliculas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pelicula)
            });

            // Si PUT no funciona, intentar con POST
            if (!response.ok) {
                response = await fetch(`${API_URL}/peliculas`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pelicula)
                });
            }
        } else {
            // Crear nueva
            response = await fetch(`${API_URL}/peliculas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pelicula)
            });
        }

        if (response.ok) {
            showAlert(id ? 'Película actualizada exitosamente' : 'Película agregada exitosamente', 'success');
            closeMovieModal();
            loadMovies();
        } else {
            const errorData = await response.text();
            showAlert(`Error al guardar película: ${errorData}`, 'error');
        }
    } catch (error) {
        console.error('Error al guardar película:', error);
        showAlert('Error de conexión con el servidor', 'error');
    }
});

// ========== ELIMINAR PELÍCULA ==========
async function deleteMovie(id) {
    if (!confirm('¿Está seguro de que desea eliminar esta película? Esta acción no se puede deshacer.')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/peliculas/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showAlert('Película eliminada exitosamente', 'success');
            loadMovies();
        } else {
            const errorData = await response.text();
            showAlert(`Error al eliminar película: ${errorData}`, 'error');
        }
    } catch (error) {
        console.error('Error al eliminar película:', error);
        showAlert('Error de conexión con el servidor', 'error');
    }
}

// ========== CERRAR MODAL AL HACER CLIC FUERA ==========
document.getElementById('movieModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeMovieModal();
    }
});