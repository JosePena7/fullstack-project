import { useState } from "react";
import { buildApiUrl } from "../api.js";

const initialFormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  serviceType: "Grass Cutting",
  frequency: "Weekly",
  comments: "",
};

const EstimateForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const updateField = (field, value) => {
    setFormData((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await fetch(buildApiUrl("/api/estimates"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save. Check backend console.");
      }

      setFeedback({
        type: "success",
        message: "Success! Your estimate request has been saved.",
      });
      setFormData(initialFormData);
    } catch (requestError) {
      setFeedback({
        type: "error",
        message:
          requestError.message ||
          "Could not connect to the server. Make sure your Flask backend is running on port 5000!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 estimate-shell">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">
                <div className="col-md-4 bg-success text-white p-5 d-flex flex-column justify-content-center">
                  <h3 className="fw-bold">Fast & Free</h3>
                  <p className="small opacity-75">Custom quote within 24 hours.</p>
                  <ul className="list-unstyled mt-4 small">
                    <li className="mb-2"><i className="bi bi-check-circle-fill me-2"></i> No Obligation</li>
                    <li><i className="bi bi-check-circle-fill me-2"></i> Local Experts</li>
                  </ul>
                </div>

                <div className="col-md-8 p-5">
                  <h2 className="fw-bold mb-4 text-dark">Get Your Quote</h2>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control bg-light border-0"
                            id="fullName"
                            value={formData.fullName}
                            onChange={(event) => updateField("fullName", event.target.value)}
                            required
                          />
                          <label htmlFor="fullName">Full Name</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control bg-light border-0"
                            id="email"
                            value={formData.email}
                            onChange={(event) => updateField("email", event.target.value)}
                            required
                          />
                          <label htmlFor="email">Email Address</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input
                            type="tel"
                            className="form-control bg-light border-0"
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={(event) => updateField("phoneNumber", event.target.value)}
                            required
                          />
                          <label htmlFor="phoneNumber">Phone Number</label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <select
                            className="form-select bg-light border-0"
                            id="frequency"
                            value={formData.frequency}
                            onChange={(event) => updateField("frequency", event.target.value)}
                          >
                            <option value="Weekly">Weekly</option>
                            <option value="Bi-Weekly">Bi-Weekly</option>
                            <option value="One-Time">One-Time Only</option>
                          </select>
                          <label htmlFor="frequency">Frequency</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control bg-light border-0"
                            id="address"
                            value={formData.address}
                            onChange={(event) => updateField("address", event.target.value)}
                            required
                          />
                          <label htmlFor="address">Service Address</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <select
                            className="form-select bg-light border-0"
                            id="service"
                            value={formData.serviceType}
                            onChange={(event) => updateField("serviceType", event.target.value)}
                          >
                            <option value="Grass Cutting">Grass Cutting</option>
                            <option value="Hedge Trimming">Hedge Trimming</option>
                            <option value="Overgrown Yard Cutting">Overgrown Yard Cutting</option>
                            <option value="Tree Work">Tree Work</option>
                          </select>
                          <label htmlFor="service">Service Needed</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <textarea
                            className="form-control bg-light border-0 estimate-notes"
                            id="comments"
                            placeholder="Property details"
                            value={formData.comments}
                            onChange={(event) => updateField("comments", event.target.value)}
                          ></textarea>
                          <label htmlFor="comments">Property Notes (optional)</label>
                        </div>
                      </div>

                      {feedback.message ? (
                        <div className="col-12">
                          <p
                            className={
                              feedback.type === "success" ? "estimate-feedback is-success" : "estimate-feedback is-error"
                            }
                          >
                            {feedback.message}
                          </p>
                        </div>
                      ) : null}

                      <div className="col-12 mt-2">
                        <button
                          type="submit"
                          className="btn btn-success btn-lg w-100 rounded-pill shadow-sm fw-bold py-3"
                          disabled={loading}
                        >
                          {loading ? (
                            <><span className="spinner-border spinner-border-sm me-2"></span>Processing...</>
                          ) : (
                            "Send My Free Estimate"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstimateForm;
