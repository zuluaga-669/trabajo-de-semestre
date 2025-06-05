const dataColombia = {
      "Caldas": ["Manizales", "Chinchiná", "La Dorada", "Riosucio"],
      "Antioquia": ["Medellín", "Envigado", "Bello", "Rionegro"],
      "Cundinamarca": ["Bogotá", "Soacha", "Zipaquirá", "Facatativá"],
      "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá"],
      "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia"],
      "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta"],
      "Bolívar": ["Cartagena", "Magangué", "Turbaco", "El Carmen de Bolívar"],
      "Magdalena": ["Santa Marta", "Ciénaga", "Fundación", "El Banco"],
      "Nariño": ["Pasto", "Ipiales", "Tumaco", "Tuquerres"]
    };

    function cargarDepartamentos() {
      const departamentoSelect = document.getElementById("departamento");
      departamentoSelect.innerHTML = '<option value="">Selecciona un departamento</option>';
      for (let depto in dataColombia) {
        let opt = document.createElement("option");
        opt.value = depto;
        opt.text = depto;
        departamentoSelect.appendChild(opt);
      }
    }

    function cargarMunicipios(depto) {
      const municipioSelect = document.getElementById("municipio");
      municipioSelect.innerHTML = '<option value="">Selecciona un municipio</option>';
      municipioSelect.disabled = !depto;

      if (dataColombia[depto]) {
        dataColombia[depto].forEach(m => {
          let opt = document.createElement("option");
          opt.value = m;
          opt.text = m;
          municipioSelect.appendChild(opt);
        });
      }
    }

    document.getElementById("departamento").addEventListener("change", (e) => {
      const depto = e.target.value;
      cargarMunicipios(depto);
    });

    document.getElementById("municipio").addEventListener("focus", function () {
      const depto = document.getElementById("departamento").value;
      if (!depto) {
        alert("Primero debes seleccionar un departamento.");
        this.blur();
      }
    });

    document.getElementById("celular").addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "");
    });

document.getElementById('registroForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('/registroUsuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const resultado = await res.json();
    document.getElementById('mensaje').innerHTML = `
      <div class="alert ${res.ok ? 'alert-success' : 'alert-danger'}">
        ${resultado.message || 'Operación completada'}
      </div>`;
  } catch (error) {
    document.getElementById('mensaje').innerHTML = `
      <div class="alert alert-danger">
        Error al enviar datos al servidor.
      </div>`;
    console.error('Error al registrar usuario:', error);
  }
});


    cargarDepartamentos();