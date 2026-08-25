/**
 * Jordanian Sign Language Translator - API Service Client
 * =======================================================
 * Manages HTTP communication between the React frontend and Flask backend.
 */

window.JSL_APP.services.api = {
  /**
   * Sends the 63-dimensional hand landmarks array to the backend for translation.
   * 
   * @param {Array<number>} landmarks - Flat array of 63 coordinates [x0, y0, z0, ..., x20, y20, z20]
   * @returns {Promise<{label: string, confidence: number}>} Prediction result
   */
  async predictGesture(landmarks) {
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ landmarks }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[API Service] Error predicting gesture:', error);
      throw error;
    }
  },

  /**
   * Submits contact feedback to the Flask server.
   * 
   * @param {Object} feedbackData - { name, email, message }
   * @returns {Promise<{status: string, message: string}>} Response state
   */
  async submitFeedback(feedbackData) {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[API Service] Error submitting feedback:', error);
      throw error;
    }
  }
};
