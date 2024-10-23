import React, { useState } from 'react';
import './VolunteerRegister.css'; // Reuse the same styling
import axiosInstance from './axiosInstance';

const provinceData = {
    "Bocas del Toro": {
      "Changuinola": ["Changuinola", "Almirante", "Guabito", "Teribe", "El Empalme", "Barriada 4 de Abril", "Other"],
      "Bastimentos": ["Isla Bastimentos", "Other"],
      "Boquerón": ["Boquerón", "Other"],
    },
    "Chiriquí": {
      "David": ["David", "Las Lomas", "Pedregal", "San Carlos", "San Pablo Viejo", "San Pablo Nuevo", "Other"],
      "Boquete": ["Boquete", "Palmira", "Alto Boquete", "Jaramillo", "Los Naranjos", "Other"],
      "Bugaba": ["Bugaba", "La Concepción", "Aserrío de Gariché", "Gómez", "Other"],
    },
    "Coclé": {
      "Penonomé": ["Penonomé", "El Coco", "Cañaveral", "Tulú", "Chiguirí Arriba", "Río Grande", "Other"],
      "Antón": ["Antón", "Río Hato", "El Chirú", "Coclé", "El Retiro", "Other"],
      "Aguadulce": ["Aguadulce", "Pocrí", "El Cristo", "El Roble", "Other"],
    },
    "Colón": {
      "Colón": ["Colón", "Cativá", "Cristóbal", "Nuevo San Juan", "Sabanitas", "Escobal", "Other"],
      "Portobelo": ["Portobelo", "Cacique", "Garrote", "Isla Grande", "Other"],
      "Santa Isabel": ["Santa Isabel", "Palma Real", "Miguel de la Borda", "Other"],
    },
    "Darién": {
      "Chepigana": ["La Palma", "Garachiné", "Sambú", "Río Congo", "Taimatí", "Other"],
      "Pinogana": ["Yaviza", "Metetí", "Púcuro", "El Real", "Other"],
    },
    "Herrera": {
      "Chitré": ["Chitré", "Monagrillo", "La Arena", "San Juan Bautista", "Llano Bonito", "Other"],
      "Ocú": ["Ocú", "Peña Blanca", "Las Minas", "Other"],
      "Parita": ["Parita", "Los Castillos", "Portobelillo", "Other"],
    },
    "Los Santos": {
      "Las Tablas": ["Las Tablas", "Guararé", "La Villa de Los Santos", "Tonosi", "Pedasí", "Other"],
      "Macaracas": ["Macaracas", "Bajos de Güera", "Espino Amarillo", "Other"],
      "Pocrí": ["Pocrí", "Paritilla", "Cañas", "Other"],
    },
    "Panamá": {
      "Panamá": ["Bella Vista", "San Francisco", "Juan Díaz", "Chilibre", "Tocumen", "Ancón", "Las Cumbres", "Other"],
      "Chepo": ["Cañita", "Chepo", "El Llano", "Las Margaritas", "Other"],
      "Taboga": ["Taboga", "Otoque Oriente", "Otoque Occidente", "Other"],
    },
    "Panamá Oeste": {
      "La Chorrera": ["La Chorrera", "Puerto Caimito", "El Coco", "Herrera", "Guadalupe", "Other"],
      "Arraiján": ["Arraiján", "Vista Alegre", "Burunga", "Veracruz", "Juan Demóstenes Arosemena", "Other"],
      "Capira": ["Capira", "Caimito", "Villa Carmen", "Cirí de Los Sotos", "Other"],
    },
    "Veraguas": {
      "Santiago": ["Santiago", "La Peña", "Canto del Llano", "San Martín de Porres", "Other"],
      "Soná": ["Soná", "Calobre", "La Mesa", "El Espino", "Other"],
      "Río de Jesús": ["Río de Jesús", "Utira", "Los Castillos", "Other"],
    }
  };

const AttendanceRegister = () => {
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
            regex = /^[A-Za-z0-9\s.,''áéíóúÁÉÍÓÚñÑ-]+$/; // For province, district, etc.
    }

    if (regex.test(value) || value === "") {
        setFormData({ ...formData, [name]: value });
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axiosInstance.post('/attendance-register/', formData);
        console.log(response.data);
        setMessage('Attendance registered successfully');
        setFormData({
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
        console.error('Error registering attendance:', error);
        setMessage('Failed to register attendance');
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
      <h1>Attendance Registration</h1>
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

export default AttendanceRegister;
