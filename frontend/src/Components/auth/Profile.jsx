import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const token = localStorage.getItem("access_token");

  const [form, setForm] = useState({
    title: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    mobile: "",
    email: "",
    dob: "",
    anniversary: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    axios
      .get(`http://127.0.0.1:8000/api/auth/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setForm((prev) => ({ ...prev, ...res.data }));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    if (!token) {
      alert("Please login again");
      return;
    }

    try {
      await axios.post(`http://127.0.0.1:8000/api/auth/profile/`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile saved successfully");
    } catch {
      alert("Failed to save profile. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <p className="text-sm text-gray-400 mb-6">
        My Account <span className="mx-2">{">"}</span> My Profile Page
      </p>

      <h1 className="text-2xl font-semibold mb-10 text-center">
        My Profile Page
      </h1>

      <div className="max-w-4xl mx-auto">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm mb-2">Title</label>
            <select
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-black border border-gray-600 rounded-md px-4 py-3"
            >
              <option value="">Select</option>
              <option>Mr</option>
              <option>Ms</option>
              <option>Mrs</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">First Name</label>
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full bg-white text-black rounded-md px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Middle Name</label>
            <input
              name="middle_name"
              value={form.middle_name}
              onChange={handleChange}
              placeholder="Enter middle name"
              className="w-full bg-white text-black rounded-md px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Last Name</label>
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full bg-white text-black rounded-md px-4 py-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-3">Gender</label>
            <div className="flex gap-6 text-sm">
              {["Female", "Male", "Transgender", "I'd rather not say"].map(
                (g) => (
                  <label key={g} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={handleChange}
                    />
                    {g}
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Mobile Number *</label>
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full bg-white text-black rounded-md px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Email Id *</label>
            <input
              name="email"
              value={form.email}
              disabled
              className="w-full bg-gray-300 text-black rounded-md px-4 py-3 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob || ""}
              onChange={handleChange}
              className="w-full bg-black border border-gray-600 rounded-md px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Date of Anniversary</label>
            <input
              type="date"
              name="anniversary"
              value={form.anniversary || ""}
              onChange={handleChange}
              className="w-full bg-black border border-gray-600 rounded-md px-4 py-3"
            />
          </div>
        </form>

        <div className="flex justify-center gap-4 mt-10">
          <button
            type="button"
            className="border border-white px-6 py-3 rounded-md text-sm"
          >
            DISCARD CHANGES
          </button>
          <button
            onClick={handleSave}
            className="bg-emerald-400 text-black px-6 py-3 rounded-md text-sm font-semibold"
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;