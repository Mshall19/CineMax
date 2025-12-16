// Configuración base de la API
const API_BASE_URL = 'http://localhost:8080/api';



// Objeto API con todos los endpoints
const API = {
    // ========== USUARIOS ==========
    usuarios: {
        async getAll() {
            const response = await fetch(`${API_BASE_URL}/usuarios`);
            if (!response.ok) throw new Error('Error al obtener usuarios');
            return response.json();
        },

        async getById(id) {
            const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
            if (!response.ok) throw new Error('Error al obtener usuario');
            return response.json();
        },

        async create(usuario) {
            const response = await fetch(`${API_BASE_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario)
            });
            if (!response.ok) throw new Error('Error al crear usuario');
            return response.json();
        },

        async update(id, usuario) {
            const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario)
            });
            if (!response.ok) throw new Error('Error al actualizar usuario');
            return response.json();
        },

        async delete(id) {
            const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar usuario');
            return true;
        }
    },

    // ========== PELÍCULAS ==========
    peliculas: {
        async getAll() {
            const response = await fetch(`${API_BASE_URL}/peliculas`);
            if (!response.ok) throw new Error('Error al obtener películas');
            return response.json();
        },

        async getById(id) {
            const response = await fetch(`${API_BASE_URL}/peliculas/${id}`);
            if (!response.ok) throw new Error('Error al obtener película');
            return response.json();
        },

        async create(pelicula) {
            const response = await fetch(`${API_BASE_URL}/peliculas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pelicula)
            });
            if (!response.ok) throw new Error('Error al crear película');
            return response.json();
        },

        async update(id, pelicula) {
            const response = await fetch(`${API_BASE_URL}/peliculas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pelicula)
            });
            if (!response.ok) throw new Error('Error al actualizar película');
            return response.json();
        },

        async delete(id) {
            const response = await fetch(`${API_BASE_URL}/peliculas/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar película');
            return true;
        }
    },

    // ========== RESERVAS ==========
    reservas: {
        async getAll() {
            const response = await fetch(`${API_BASE_URL}/reservas`);
            if (!response.ok) throw new Error('Error al obtener reservas');
            return response.json();
        },

        async getById(id) {
            const response = await fetch(`${API_BASE_URL}/reservas/${id}`);
            if (!response.ok) throw new Error('Error al obtener reserva');
            return response.json();
        },

        async create(reserva) {
            const response = await fetch(`${API_BASE_URL}/reservas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reserva)
            });
            if (!response.ok) throw new Error('Error al crear reserva');
            return response.json();
        },

        async delete(id) {
            const response = await fetch(`${API_BASE_URL}/reservas/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar reserva');
            return true;
        }
    }
};

// Exportar para uso global
window.API = API;