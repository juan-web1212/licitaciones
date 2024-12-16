// Datos de ejemplo para las licitaciones
const licitaciones = [
    { nombre: "Construcción de puente", descripcion: "Construcción de un puente en la zona norte", cierre: "2024-12-30", enlace: "#" },
    { nombre: "Suministro de computadoras", descripcion: "Compra de 100 computadoras para oficinas", cierre: "2024-12-25", enlace: "#" },
    { nombre: "Servicios de limpieza", descripcion: "Contrato de limpieza para edificios públicos", cierre: "2024-12-20", enlace: "#" }
];

// Renderizar las licitaciones en la tabla
const tbody = document.querySelector("#licitaciones tbody");

licitaciones.forEach(licitacion => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${licitacion.nombre}</td>
        <td>${licitacion.descripcion}</td>
        <td>${licitacion.cierre}</td>
        <td><a href="${licitacion.enlace}" target="_blank">Ver Detalles</a></td>
    `;

    tbody.appendChild(row);
});
