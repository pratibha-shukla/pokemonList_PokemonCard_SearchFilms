import React, { useState, useEffect, useRef } from "react";

export default function PaymentSystem() {
  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState(1); // Multi-page form tracking (1: Details, 2: Review, 3: Status)
  const [amount, setAmount] = useState("");
  const [paymentToken, setPaymentToken] = useState(""); // SYSTEM: Idempotency token to prevent duplicates
  
  const [paymentStatus, setPaymentStatus] = useState("idle"); // 'idle' | 'processing' | 'success' | 'delayed'
  const pollingRef = useRef(null);

  // --- SYSTEM DESIGN LOGIC ---

  // Generate a unique token when the user enters the review step
  const generateIdempotencyToken = () => {
    const uniqueToken = "req_" + Math.random().toString(36).substring(2, 11);
    setPaymentToken(uniqueToken);
    setStep(2);
  };

  const handlePaymentSubmit = async () => {
    if (paymentStatus === "processing") return; // SYSTEM: Blocks accidental multi-clicks physically

    setPaymentStatus("processing");
    setStep(3); // Immediately transition to tracking view

    // Mock initial API Payload: sending payload + unique idempotency token
    console.log(`Sending payment for $${amount} with Idempotency Key: ${paymentToken}`);

    // Start Polling system to allow status checks at any time
    startStatusPolling();
  };

  const startStatusPolling = () => {
    // Clear any existing pollers to avoid memory leaks
    if (pollingRef.current) clearInterval(pollingRef.current);

    let attempts = 0;
    pollingRef.current = setInterval(async () => {
      attempts++;
      
      // Simulate real-world network variations
      if (attempts === 2) {
        // SYSTEM: Handle delayed/uncertain edge cases gracefully
        setPaymentStatus("delayed"); 
      } else if (attempts >= 5) {
        setPaymentStatus("success");
        clearInterval(pollingRef.current);
      }
    }, 2000); // Polls status route every 2 seconds
  };

  const checkStatusManually = () => {
    // SYSTEM: Allows manual checks/refreshing status at any time
    alert(`Current Real-time Network Status: ${paymentStatus.toUpperCase()}`);
  };

  const resetWorkflow = () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    setAmount("");
    setPaymentToken("");
    setPaymentStatus("idle");
    setStep(1);
  };

  // Cleanup intervals on component destruction
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  // --- USER EXPERIENCE VIEWS ---
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Payment Processing Center</h3>

      {/* STEP 1: ENTER DETAILS */}
      {step === 1 && (
        <div>
          <h4>Step 1: Payment Details</h4>
          <label style={styles.label}>Amount ($ USD)</label>
          <input
            type="number"
            style={styles.input}
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button 
            disabled={!amount || amount <= 0} 
            style={styles.btnPrimary} 
            onClick={generateIdempotencyToken}
          >
            Review Payment
          </button>
        </div>
      )}

      {/* STEP 2: REVIEW & SECURE SUBMIT */}
      {step === 2 && (
        <div>
          <h4>Step 2: Review Submission</h4>
          <p>Amount to Charge: <strong>${amount}</strong></p>
          <p style={styles.tokenText}>System Idempotency Key: <code>{paymentToken}</code></p>
          
          <div style={styles.buttonGroup}>
            <button style={styles.btnSecondary} onClick={() => setStep(1)}>Back</button>
            <button style={styles.btnSuccess} onClick={handlePaymentSubmit}>
              Authorize Secure Payment
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: ASYNCHRONOUS STATUS TRACKING */}
      {step === 3 && (
        <div>
          <h4>Step 3: Live Payment Tracker</h4>
          
          <div style={{ ...styles.statusBox, ...styles[paymentStatus] }}>
            Status: <strong>{paymentStatus.toUpperCase()}</strong>
          </div>

          {/* Conditional Guidance UI for Delays/Uncertainty */}
          {paymentStatus === "delayed" && (
            <p style={styles.alertText}>
              ⚠️ This payment is taking longer than expected. Do not refresh. Our system is safely verifying downstream ledgers.
            </p>
          )}
          {paymentStatus === "success" && (
            <p style={styles.successText}>🎉 Payment processed successfully!</p>
          )}

          <div style={styles.buttonGroup}>
            <button style={styles.btnSecondary} onClick={checkStatusManually}>
              Check Status Now
            </button>
            {paymentStatus === "success" && (
              <button style={styles.btnPrimary} onClick={resetWorkflow}>
                Make Another Payment
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Minimal CSS clean styles
const styles = {
  card: { maxWidth: "420px", margin: "40px auto", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", backgroundColor: "#fff", fontFamily: "system-ui, sans-serif" },
  title: { margin: "0 0 20px 0", color: "#1a1a1a", borderBottom: "1px solid #eee", paddingBottom: "10px" },
  label: { display: "block", marginBottom: "6px", fontWeight: "6px", color: "#444" },
  input: { width: "100%", padding: "10px", marginBottom: "16px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" },
  btnPrimary: { width: "100%", backgroundColor: "#0066cc", color: "#fff", border: "none", padding: "12px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
  btnSecondary: { backgroundColor: "#6e6e73", color: "#fff", border: "none", padding: "12px", borderRadius: "6px", cursor: "pointer" },
  btnSuccess: { backgroundColor: "#28a745", color: "#fff", border: "none", padding: "12px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
  buttonGroup: { display: "flex", gap: "10px", marginTop: "20px" },
  tokenText: { fontSize: "12px", color: "#666", backgroundColor: "#f5f5f7", padding: "6px", borderRadius: "4px" },
  statusBox: { padding: "16px", borderRadius: "6px", textAlign: "center", margin: "16px 0", fontWeight: "500" },
  alertText: { color: "#b76e00", fontSize: "13px", backgroundColor: "#fff9db", padding: "10px", borderRadius: "6px", border: "1px solid #ffe3e3" },
  successText: { color: "#2b8a3e", fontWeight: "bold", textAlign: "center" },
  // Dynamic status styling
  processing: { backgroundColor: "#e7f5ff", color: "#1c7ed6" },
  delayed: { backgroundColor: "#fff9db", color: "#f08c00" },
  success: { backgroundColor: "#ebfbee", color: "#2b8a3e" }
};
