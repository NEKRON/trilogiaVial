 // Datos de ejemplo
 const datos = [
    { nombre: 'Juan', tipoDocumento: 'CC', numeroDocumento: '123456789', tipoCapacitacion: 'Curso', curso: 'Auxiliar de tráfico vial y control de pmt', ciudad: 'Bogotá', empresa: 'Empresa1', fechaCertificacion: '2022-01-01', fechaVencimiento: '2023-01-01', estado: 'Aprobado' },
    { nombre: 'María', tipoDocumento: 'CE', numeroDocumento: '987654321', tipoCapacitacion: 'Diplomado', diplomado: 'Diplomado nueva metodología pesv', ciudad: 'Medellín', empresa: 'Empresa2', fechaCertificacion: '2022-02-15', fechaVencimiento: '2023-02-15', estado: 'NoAprobado' },
    // Puedes agregar más datos aquí
  ];

  let indiceEdicion = -1;

  // Función para mostrar los datos en la tabla
  function mostrarDatos() {
    const tablaBody = document.getElementById('tablaBody');
    tablaBody.innerHTML = '';

    datos.forEach((registro, index) => {
      const fila = document.createElement('tr');

      const celdaNombre = document.createElement('td');
      celdaNombre.textContent = registro.nombre;

      const celdaTipoDocumento = document.createElement('td');
      celdaTipoDocumento.textContent = registro.tipoDocumento === 'CC' ? 'Cédula de ciudadanía' : 'Cédula de extranjería';

      const celdaNumeroDocumento = document.createElement('td');
      celdaNumeroDocumento.textContent = registro.numeroDocumento;

      const celdaTipoCapacitacion = document.createElement('td');
      celdaTipoCapacitacion.textContent = registro.tipoCapacitacion;

      const celdaCurso = document.createElement('td');
      celdaCurso.textContent = registro.curso || '-';

      const celdaDiplomado = document.createElement('td');
      celdaDiplomado.textContent = registro.diplomado || '-';

      const celdaCiudad = document.createElement('td');
      celdaCiudad.textContent = registro.ciudad;

      const celdaEmpresa = document.createElement('td');
      celdaEmpresa.textContent = registro.empresa;

      const celdaFechaCertificacion = document.createElement('td');
      celdaFechaCertificacion.textContent = registro.fechaCertificacion;

      const celdaFechaVencimiento = document.createElement('td');
      celdaFechaVencimiento.textContent = registro.fechaVencimiento;

      const celdaEstado = document.createElement('td');
      celdaEstado.textContent = registro.estado;
      // Aplicar estilos según el estado
      celdaEstado.classList.add(registro.estado === 'Aprobado' ? 'estadoAprobado' : 'estadoNoAprobado');

      const celdaAcciones = document.createElement('td');

      const botonEditar = document.createElement('i');
      botonEditar.innerHTML = '<i class="fa-solid fa-pencil"></i>'; // Ícono de lápiz para editar
      botonEditar.addEventListener('click', () => editarRegistro(index));
      
      const botonEliminar = document.createElement('i');
      botonEliminar.innerHTML = '<i class="fa-solid fa-trash"></i>'; // Ícono de papelera para eliminar
      botonEliminar.addEventListener('click', () => eliminarRegistro(index));
      

      celdaAcciones.appendChild(botonEditar);
      celdaAcciones.appendChild(botonEliminar);

      fila.appendChild(celdaNombre);
      fila.appendChild(celdaTipoDocumento);
      fila.appendChild(celdaNumeroDocumento);
      fila.appendChild(celdaTipoCapacitacion);
      fila.appendChild(celdaCurso);
      fila.appendChild(celdaDiplomado);
      fila.appendChild(celdaCiudad);
      fila.appendChild(celdaEmpresa);
      fila.appendChild(celdaFechaCertificacion);
      fila.appendChild(celdaFechaVencimiento);
      fila.appendChild(celdaEstado);
      fila.appendChild(celdaAcciones);

      tablaBody.appendChild(fila);
    });
  }

  // Función para mostrar las opciones de capacitación según la elección
  function mostrarOpcionesCapacitacion() {
    const tipoCapacitacion = document.getElementById('tipoCapacitacion').value;
    const opcionesCurso = document.getElementById('opcionesCurso');
    const opcionesDiplomado = document.getElementById('opcionesDiplomado');

    if (tipoCapacitacion === 'Curso') {
      opcionesCurso.style.display = 'block';
      opcionesDiplomado.style.display = 'none';
    } else if (tipoCapacitacion === 'Diplomado') {
      opcionesCurso.style.display = 'none';
      opcionesDiplomado.style.display = 'block';
    }
  }

  // Función para agregar o editar un registro
  function agregarEditarRegistro() {
    const nombre = document.getElementById('nombre').value;
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const numeroDocumento = document.getElementById('numeroDocumento').value;
    const tipoCapacitacion = document.getElementById('tipoCapacitacion').value;
    const curso = document.getElementById('curso').value;
    const diplomado = document.getElementById('diplomado').value;
    const ciudad = document.getElementById('ciudad').value;
    const empresa = document.getElementById('empresa').value;
    const fechaCertificacion = document.getElementById('fechaCertificacion').value;
    const fechaVencimiento = document.getElementById('fechaVencimiento').value;
    const estado = document.getElementById('estado').value;

    // Validar que se ingresen datos
    if (nombre && tipoDocumento && numeroDocumento && tipoCapacitacion && ciudad && empresa && fechaCertificacion && fechaVencimiento && estado) {
      if (indiceEdicion === -1) {
        // Agregar nuevo registro
        const nuevoRegistro = { nombre, tipoDocumento, numeroDocumento, tipoCapacitacion, curso, diplomado, ciudad, empresa, fechaCertificacion, fechaVencimiento, estado };
        datos.push(nuevoRegistro);
      } else {
        // Editar registro existente
        datos[indiceEdicion].nombre = nombre;
        datos[indiceEdicion].tipoDocumento = tipoDocumento;
        datos[indiceEdicion].numeroDocumento = numeroDocumento;
        datos[indiceEdicion].tipoCapacitacion = tipoCapacitacion;
        datos[indiceEdicion].curso = curso;
        datos[indiceEdicion].diplomado = diplomado;
        datos[indiceEdicion].ciudad = ciudad;
        datos[indiceEdicion].empresa = empresa;
        datos[indiceEdicion].fechaCertificacion = fechaCertificacion;
        datos[indiceEdicion].fechaVencimiento = fechaVencimiento;
        datos[indiceEdicion].estado = estado;
        indiceEdicion = -1; // Reiniciar el índice de edición
      }

      mostrarDatos();
      limpiarFormulario();
      mostrarBotonAgregar();
    } else {
      alert('Por favor, ingresa todos los campos.');
    }
  }

  // Función para editar un registro
  function editarRegistro(index) {
    const registro = datos[index];
    document.getElementById('nombre').value = registro.nombre;
    document.getElementById('tipoDocumento').value = registro.tipoDocumento;
    document.getElementById('numeroDocumento').value = registro.numeroDocumento;
    document.getElementById('tipoCapacitacion').value = registro.tipoCapacitacion;
    document.getElementById('curso').value = registro.curso;
    document.getElementById('diplomado').value = registro.diplomado;
    document.getElementById('ciudad').value = registro.ciudad;
    document.getElementById('empresa').value = registro.empresa;
    document.getElementById('fechaCertificacion').value = registro.fechaCertificacion;
    document.getElementById('fechaVencimiento').value = registro.fechaVencimiento;
    document.getElementById('estado').value = registro.estado;

    // Mostrar u ocultar opciones según el tipo de capacitación
    mostrarOpcionesCapacitacion();

    // Cambiar el texto y el evento del botón
    document.getElementById('guardarBtn').textContent = 'Guardar';
    document.getElementById('guardarBtn').onclick = function () {
      agregarEditarRegistro();
    };

    // Mostrar el botón de cancelar
    document.getElementById('cancelarBtn').style.display = 'inline';

    // Actualizar el índice de edición
    indiceEdicion = index;
  }

  // Función para eliminar un registro
  function eliminarRegistro(index) {
    datos.splice(index, 1);
    mostrarDatos();
    mostrarBotonAgregar();
  }

  // Función para cancelar la edición
  function cancelarEdicion() {
    limpiarFormulario();
    mostrarBotonAgregar();
    indiceEdicion = -1;
  }

  // Función para limpiar el formulario
  function limpiarFormulario() {
    document.getElementById('crudForm').reset();
  }

  // Función para mostrar el botón de agregar y ocultar el de guardar
  function mostrarBotonAgregar() {
    document.getElementById('guardarBtn').textContent = 'Agregar';
    document.getElementById('guardarBtn').onclick = function () {
      agregarEditarRegistro();
    };

    // Ocultar el botón de cancelar
    document.getElementById('cancelarBtn').style.display = 'none';
  }

  // Función para buscar por número de documento
  function buscarPorNumeroDocumento() {
    const numeroDocumentoBusqueda = document.getElementById('busquedaNumeroDocumento').value.trim();

    if (numeroDocumentoBusqueda === '') {
      mostrarDatos();
      return;
    }

    const resultados = datos.filter(registro => registro.numeroDocumento === numeroDocumentoBusqueda);

    const tablaBody = document.getElementById('tablaBody');
    tablaBody.innerHTML = '';

    resultados.forEach((registro, index) => {
      const fila = document.createElement('tr');

      const celdaNombre = document.createElement('td');
      celdaNombre.textContent = registro.nombre;

      const celdaTipoDocumento = document.createElement('td');
      celdaTipoDocumento.textContent = registro.tipoDocumento === 'CC' ? 'Cédula de ciudadanía' : 'Cédula de extranjería';

      const celdaNumeroDocumento = document.createElement('td');
      celdaNumeroDocumento.textContent = registro.numeroDocumento;

      const celdaTipoCapacitacion = document.createElement('td');
      celdaTipoCapacitacion.textContent = registro.tipoCapacitacion;

      const celdaCurso = document.createElement('td');
      celdaCurso.textContent = registro.curso || '-';

      const celdaDiplomado = document.createElement('td');
      celdaDiplomado.textContent = registro.diplomado || '-';

      const celdaCiudad = document.createElement('td');
      celdaCiudad.textContent = registro.ciudad;

      const celdaEmpresa = document.createElement('td');
      celdaEmpresa.textContent = registro.empresa;

      const celdaFechaCertificacion = document.createElement('td');
      celdaFechaCertificacion.textContent = registro.fechaCertificacion;

      const celdaFechaVencimiento = document.createElement('td');
      celdaFechaVencimiento.textContent = registro.fechaVencimiento;

      const celdaEstado = document.createElement('td');
      celdaEstado.textContent = registro.estado;
      // Aplicar estilos según el estado
      celdaEstado.classList.add(registro.estado === 'Aprobado' ? 'estadoAprobado' : 'estadoNoAprobado');

      const celdaAcciones = document.createElement('td');

      const botonEditar = document.createElement('button');
      botonEditar.textContent = 'Editar';
      botonEditar.addEventListener('click', () => editarRegistro(index));

      const botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.addEventListener('click', () => eliminarRegistro(index));

      celdaAcciones.appendChild(botonEditar);
      celdaAcciones.appendChild(botonEliminar);

      fila.appendChild(celdaNombre);
      fila.appendChild(celdaTipoDocumento);
      fila.appendChild(celdaNumeroDocumento);
      fila.appendChild(celdaTipoCapacitacion);
      fila.appendChild(celdaCurso);
      fila.appendChild(celdaDiplomado);
      fila.appendChild(celdaCiudad);
      fila.appendChild(celdaEmpresa);
      fila.appendChild(celdaFechaCertificacion);
      fila.appendChild(celdaFechaVencimiento);
      fila.appendChild(celdaEstado);
      fila.appendChild(celdaAcciones);

      tablaBody.appendChild(fila);
    });
  }

  // Mostrar datos al cargar la página
  mostrarDatos();

   // Función para exportar a Excel
function exportarAExcel() {
  const datosExportar = datos.map(registro => ({
    Nombre: registro.nombre,
    'Tipo de Documento': registro.tipoDocumento === 'CC' ? 'Cédula de ciudadanía' : 'Cédula de extranjería',
    'Número de Documento': registro.numeroDocumento,
    'Tipo de Capacitación': registro.tipoCapacitacion,
    Curso: registro.curso || '-',
    Diplomado: registro.diplomado || '-',
    Ciudad: registro.ciudad,
    Empresa: registro.empresa,
    'Fecha de Certificación': registro.fechaCertificacion,
    'Fecha de Vencimiento': registro.fechaVencimiento,
    Estado: registro.estado,
  }));

  const hojaExcel = XLSX.utils.json_to_sheet(datosExportar);
  const libroExcel = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libroExcel, hojaExcel, 'Certificaciones');

  // Guardar el archivo Excel
  XLSX.writeFile(libroExcel, 'certificaciones.xlsx');
}

// Función para cargar desde Excel
function cargarDesdeExcel(event) {
  const input = event.target;
  const file = input.files[0];

  if (file) {
    const lector = new FileReader();

    lector.onload = function (e) {
      try {
        const contenido = e.target.result;
        const libroExcel = XLSX.read(contenido, { type: 'binary' });
        const primeraHoja = libroExcel.SheetNames[0];
        const datosExcel = XLSX.utils.sheet_to_json(libroExcel.Sheets[primeraHoja], { header: 1 });

        // Eliminar la primera fila (encabezados) si es necesario
        datosExcel.shift();

        // Actualizar datos y mostrarlos
        datos = datosExcel.map(row => ({
          nombre: row[0],
          tipoDocumento: row[1],
          numeroDocumento: row[2],
          tipoCapacitacion: row[3],
          curso: row[4] || '-',
          diplomado: row[5] || '-',
          ciudad: row[6],
          empresa: row[7],
          fechaCertificacion: row[8],
          fechaVencimiento: row[9],
          estado: row[10],
        }));

        // Actualizar el almacenamiento local
        actualizarLocalStorage();

        // Mostrar los datos en la tabla
        mostrarDatos();
      } catch (error) {
        console.error('Error al leer el archivo Excel:', error);
        alert('Error al leer el archivo Excel. Por favor, asegúrate de que el formato sea correcto.');
      }
    };

    lector.readAsBinaryString(file);
  }
}