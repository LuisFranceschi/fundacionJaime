import React, { useState } from 'react';
import './VolunteerRegister.css'; // Include your styling here
import axiosInstance from './axiosInstance';


const provinceData = {
  "Bocas del Toro": {
    "Changuinola": ["Changuinola", "Almirante", "Guabito", "Teribe", "El Empalme", "Barriada 4 de Abril", "Other"],
    "Bastimentos": ["Isla Bastimentos", "Other"],
    "Boquerón": ["Boquerón", "Other"],
    "Almirante": ["Almirante", "Barrio Francés", "Barriada Guaymí", "Puerto Escondido", "Valle Risco", "Las Delicias", "Other"],
    "Chiriquí Grande": ["Chiriquí Grande", "Punta Peña", "Punta Robalo", "Miramar", "Santa Catalina", "Isla Cayo Agua", "Other"]
  },
  "Chiriquí": {
    "David": ["David", "Las Lomas", "Pedregal", "San Carlos", "San Pablo Viejo", "San Pablo Nuevo", "Bijagual", "Chiriquí", "Guacas", "Las Mesitas", "Los Anastasios", "Other"],
    "Boquete": ["Boquete", "Palmira", "Alto Boquete", "Jaramillo", "Los Naranjos", "Caldera", "Other"],
    "Bugaba": ["Bugaba", "La Concepción", "Aserrío de Gariché", "Gómez", "Santa Marta", "Santo Domingo", "Sortová", "Other"],
    "Dolega": ["Dolega", "Los Algarrobos", "Potrerillos", "Rovira", "Tinajas", "Los Anastacios", "Other"],
    "Gualaca": ["Gualaca", "Hornitos", "Los Angeles", "Paja de Sombrero", "Río Sereno", "Other"],
    "Barú": ["Puerto Armuelles", "Limones", "Baco", "Progreso", "Rodríguez", "Other"],
    "Remedios": ["Remedios", "Santa Lucia", "El Nancito", "Cerro Viejo", "El Porvenir", "Other"],
    "San Lorenzo": ["San Lorenzo", "Boca Chica", "Boca del Monte", "San Juan", "Horconcitos", "Other"],
    "Tolé": ["Tolé", "Quebrada de Piedra", "Veladero", "Potrero de Caña", "El Cristo", "Cascabel", "Other"],
    "Alanje": ["Alanje", "Divalá", "Guarumal", "Querévalo", "Santo Tomás", "El Tejar", "Other"],
    "Boquerón": ["Boquerón", "Guabal", "Bágala", "Cochea", "Pedregalito", "Other"],
    "Renacimiento": ["Río Sereno", "Santa Clara", "Breñón", "Monte Lirio", "Plaza de Caisán", "Dominical", "Cañas Gordas", "Other"],
    "San Félix": ["San Félix", "Las Lajas", "Lajas Adentro", "Santa Cruz", "Juay", "Other"],
    "Boca Chica": ["Boca Chica", "San José", "San Juan", "Punta Burica", "Other"]
 },
  "Coclé": {
    "Penonomé": ["Penonomé", "El Coco", "Cañaveral", "Tulú", "Chiguirí Arriba", "Río Grande", "Other"],
    "Antón": ["Antón", "Río Hato", "El Chirú", "Coclé", "El Retiro", "Other"],
    "Aguadulce": ["Aguadulce", "Pocrí", "El Cristo", "El Roble", "Other"],
    "La Pintada": ["La Pintada", "Llano Grande", "Chiguirí Arriba", "El Harino", "Las Lomas", "El Potrero", "Other"],
    "Natá": ["Natá", "Capellanía", "El Caño", "Las Huacas", "Toza", "Other"],
    "Olá": ["Olá", "El Copé", "El Palmar", "La Pava", "Other"],
  },
  "Colón": {
    "Colón": ["Colón", "Cativá", "Cristóbal", "Nuevo San Juan", "Sabanitas", "Escobal", "Other"],
    "Portobelo": ["Portobelo", "Cacique", "Garrote", "Isla Grande", "Other"],
    "Santa Isabel": ["Santa Isabel", "Palma Real", "Miguel de la Borda", "Other"],
    "Donoso": ["Donoso", "Miguel de la Borda", "Coclé del Norte", "Gobea", "Río Indio", "Other"
   ],
   "Chagres": [
      "Chagres", "Achiote", "Escobal", "La Encantada", "Nueva Arenosa", "El Guabo", "Other"
    ]
  },
  "Darién": {
    "Chepigana": ["La Palma", "Garachiné", "Sambú", "Río Congo", "Taimatí", "Other"],
    "Pinogana": ["Yaviza", "Metetí", "Púcuro", "El Real", "Other"],
  },
  "Herrera": {
    "Chitré": ["Chitré", "Monagrillo", "La Arena", "San Juan Bautista", "Llano Bonito", "Other"],
    "Ocú": ["Ocú", "Peña Blanca", "Las Minas", "Other"],
    "Parita": ["Parita", "Los Castillos", "Portobelillo", "Other"],
    "Pesé": ["Pesé", "El Pájaro", "Las Cabras", "Rincón Hondo", "Las Minas", "Other"],
    "Santa María": ["Santa María", "Chupampa", "El Rincón", "Los Canelos", "Other"],
    "Los Pozos": ["Los Pozos", "El Calabacito", "El Capurí", "El Cedro", "Las Llanas", "Other"],
    "Las Minas": ["Las Minas", "Chepo", "Chumical", "Leones", "Other"],
    "Los Santos": ["Las Tablas", "Guararé", "La Villa de Los Santos", "Tonosí", "Pedasí", "Other"]
  },
  "Los Santos": {
    "Las Tablas": ["Las Tablas", "Guararé", "La Villa de Los Santos", "Tonosi", "Pedasí", "Other"],
    "Macaracas": ["Macaracas", "Bajos de Güera", "Espino Amarillo", "Other"],
    "Pocrí": ["Pocrí", "Paritilla", "Cañas", "Other"],
    "Guararé": ["Guararé", "El Espinal", "La Enea", "Las Trancas", "Other"]
  },
  "Panamá":{
   "Panamá": [
      "Bella Vista", "Betania", "Curundú", "El Chorrillo", "Juan Díaz", "Las Cumbres",
      "Las Mañanitas", "Pacora", "Parque Lefevre", "Pedregal", "Pueblo Nuevo", "San Felipe",
      "San Francisco", "San Martín", "Santa Ana", "Tocumen", "24 de Diciembre", "Ancón",
      "Calidonia", "Chilibre"
  ],
  "San Miguelito": [
      "Amelia Denis de Icaza", "Belisario Frías", "Belisario Porras", "José Domingo Espinar",
      "Mateo Iturralde", "Omar Torrijos", "Rufina Alfaro", "Victoriano Lorenzo"
  ],
  "Chepo": [
      "Cañita", "Chepo", "Chepillo", "El Llano", "Las Margaritas", "Santa Cruz",
      "Tortí", "Madungandí"
  ],
  "Taboga": [
      "Taboga", "Otoque Oriente", "Otoque Occidente"
  ],
  "Chimán": [
      "Brujas", "Chimán", "Gonzalo Vásquez", "Pásiga", "Unión Santeña"
  ],
  "Balboa": [
      "La Esmeralda", "La Guinea", "Río Congo", "Saboga", "San Miguel"
  ],
  },
  "Panamá Oeste": {
    "Arraiján": [
      "Arraiján", "Burunga", "Cerro Silvestre", "Juan Demóstenes Arosemena", 
      "Nuevo Emperador", "Santa Clara", "Veracruz", "Vacamonte", "Vista Alegre"
  ],
  "Capira": [
      "Caimito", "Campana", "Capira", "Cermeño", "Cirí de Los Sotos", 
      "Cirí Grande", "El Cacao", "La Trinidad", "Las Ollas Arriba", 
      "Lídice", "Villa Carmen", "Villa Rosario", "Santa Rosa"
  ],
  "Chame": [
      "Bejuco", "Buenos Aires", "Cabuya", "Chame", "Chicá", "El Líbano", 
      "Las Lajas", "Nueva Gorgona", "Punta Chame", "Sajalices", "Sorá"
  ],
  "La Chorrera": [
      "Amador", "Arosemena", "Barrio Balboa", "Barrio Colón", "El Arado", 
      "El Coco", "Feuillet", "Guadalupe", "Herrera", "Hurtado", "Iturralde", 
      "La Represa", "Los Díaz", "Mendoza", "Obaldía", "Playa Leona", 
      "Puerto Caimito", "Santa Rita"
  ],
  "San Carlos": [
      "El Espino", "El Higo", "Guayabito", "La Ermita", "La Laguna", 
      "Las Uvas", "Los Llanitos", "San Carlos", "San José"
  ]
  },
  "Veraguas": {
    "Santiago": ["Santiago", "La Peña", "Canto del Llano", "San Martín de Porres", "Other"],
    "Soná": ["Soná", "Calobre", "La Mesa", "El Espino", "Other"],
    "Río de Jesús": ["Río de Jesús", "Utira", "Los Castillos", "Other"],
    "Atalaya": ["Atalaya", "San Antonio", "La Montañuela", "Other"],
    "Cañazas": ["Cañazas", "San Marcelo", "El Picador", "Other"]
  }
};


const VolunteerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    email: '',
    phone: '',
    province: '',
    district: '',
    corregimiento: '',
    otherProvince: '',
    otherDistrict: '',
    otherCorregimiento: ''
  });

  const [message, setMessage] = useState(''); // State for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    let regex;
    
    switch (name) {
        case "name":
            regex = /^[A-Za-z\s]+$/;
            break;
        case "id":
        case "phone":
            regex = /^[A-Za-z0-9]+$/;
            break;
        case "email":
            regex = /^.*$/;
            break;
        default:
            regex = /^[A-Za-z0-9\s.,'áéíóúÁÉÍÓÚñÑ'-]+$/; // For province, district, etc.
    }

    if (regex.test(value) || value === "") {
        setFormData({ ...formData, [name]: value });
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axiosInstance.post('/volunteer-register/', formData);
        console.log(response.data);
        setMessage('Volunteer registered successfully');
        setFormData({ // Clear the form fields
            name: '',
            id: '',
            email: '',
            phone: '',
            province: '',
            district: '',
            corregimiento: '',
            otherProvince: '',
            otherDistrict: '',
            otherCorregimiento: ''
        });
    } catch (error) {
        console.error('Error registering volunteer:', error);
        setMessage('Failed to register volunteer');
    }
};


  const getDistricts = () => {
    return formData.province && provinceData[formData.province]
      ? Object.keys(provinceData[formData.province])
      : [];
  };

  const getCorregimientos = () => {
    return formData.province && formData.district && provinceData[formData.province] && provinceData[formData.province][formData.district]
      ? provinceData[formData.province][formData.district]
      : [];
  };

  return (
    <div className="register-container">
      <h1>Volunteer Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={formData.id}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <select
          name="province"
          value={formData.province}
          onChange={handleChange}
          required
          className="dropdown"
        >
          <option value="">Select Province</option>
          {Object.keys(provinceData).map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        {formData.province === "Other" && (
          <>
            <input
              type="text"
              name="otherProvince"
              placeholder="Enter Province"
              value={formData.otherProvince}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="otherDistrict"
              placeholder="Enter District"
              value={formData.otherDistrict}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="otherCorregimiento"
              placeholder="Enter Corregimiento"
              value={formData.otherCorregimiento}
              onChange={handleChange}
              required
            />
          </>
        )}
        {formData.province && formData.province !== "Other" && (
          <>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="dropdown"
            >
              <option value="">Select District</option>
              {getDistricts().map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
            {formData.district === "Other" && (
              <>
                <input
                  type="text"
                  name="otherDistrict"
                  placeholder="Enter District"
                  value={formData.otherDistrict}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="otherCorregimiento"
                  placeholder="Enter Corregimiento"
                  value={formData.otherCorregimiento}
                  onChange={handleChange}
                  required
                />
              </>
            )}
          </>
        )}
        {formData.district && formData.district !== "Other" && (
          <select
            name="corregimiento"
            value={formData.corregimiento}
            onChange={handleChange}
            required
            className="dropdown"
          >
            <option value="">Select Corregimiento</option>
            {getCorregimientos().map((corregimiento) => (
              <option key={corregimiento} value={corregimiento}>
                {corregimiento}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        )}
        {formData.corregimiento === "Other" && (
          <input
            type="text"
            name="otherCorregimiento"
            placeholder="Enter Corregimiento"
            value={formData.otherCorregimiento}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">Register Attendance</button>
      </form>
      {message && <p className="success-message">{message}</p>} {/* Display the message */}
      <div className="disclaimer-card">
        <p>
          Al enviar este formulario, usted acepta el tratamiento de sus datos personales de conformidad con la Ley 81 de 2019 de Protección de Datos Personales de Panamá. Sus datos se utilizarán únicamente para fines de registro de asistencia y se tratarán con estricta confidencialidad. Usted tiene derecho a acceder, rectificar, suprimir u oponerse al tratamiento de sus datos en cualquier momento. Para más información, consulte la <a href="https://www.gacetaoficial.gob.pa/pdfTemp/28743_A/73630.pdf" target="_blank" rel="noopener noreferrer">Ley 81</a>.
        </p>
      </div>
    </div>
  );
};

export default VolunteerRegister;
