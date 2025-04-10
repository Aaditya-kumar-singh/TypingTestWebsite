import { useNavigate } from "react-router-dom";

const countries = [
  { name: "United States", shortName: "US", flag: "https://flagcdn.com/w40/us.png" },
  { name: "India", shortName: "IN", flag: "https://flagcdn.com/w40/in.png" },
  { name: "Germany", shortName: "DE", flag: "https://flagcdn.com/w40/de.png" },
];

export default function CountrySelection({ setSelectedCountry }) {
  const navigate = useNavigate();

  const selectCountry = (country) => {
    setSelectedCountry(country);
    navigate("/"); // Redirect to home after selection
  };

  return (
    <div style={{ padding: "20px", background: "#1A1A2E", color: "white" }}>
      <h2>Select a Country</h2>
      <ul>
        {countries.map((country) => (
          <li key={country.shortName} onClick={() => selectCountry(country)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <img src={country.flag} alt={country.name} width="30" />
            {country.name} ({country.shortName})
          </li>
        ))}
      </ul>
    </div>
  );
}
