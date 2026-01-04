import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function EmailTemplate({
  userName = "",
  type = "budget-alert",
  data = {},
}) {
  if (type == "monthly-report") {
    // Add monthly report template here
    return null;
  }
  if (type == "budget-alert") {
    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>🚨 Budget Alert</Heading>
            <Text style={styles.text}>
              Hello <b>{userName || "User"}</b>,
            </Text>
            <Text style={styles.text}>
              You&rsquo;ve used{" "}
              <b style={{ color: "#ef4444" }}>
                {data?.percentageUsed?.toFixed(1)}%
              </b>{" "}
              of your monthly budget.
            </Text>
            <Section style={styles.statsContainer}>
              <div style={styles.statsRow}>
                <div style={styles.stat}>
                  <Text style={styles.statLabel}>Budget Amount</Text>
                  <Text style={styles.statValue}>₹{data?.budgetAmount}</Text>
                </div>
                <div style={styles.stat}>
                  <Text style={styles.statLabel}>Spent So Far</Text>
                  <Text style={styles.statValue}>₹{data?.totalExpenses}</Text>
                </div>
                <div style={styles.stat}>
                  <Text style={styles.statLabel}>Remaining</Text>
                  <Text
                    style={{
                      ...styles.statValue,
                      color:
                        data?.budgetAmount - data?.totalExpenses < 0
                          ? "#ef4444"
                          : "#10b981",
                    }}
                  >
                    ₹{(data?.budgetAmount - data?.totalExpenses).toFixed(2)}
                  </Text>
                </div>
              </div>
            </Section>
            <Section style={styles.footer}>
              <Text>
                <span style={{ color: "#6366f1", fontWeight: 600 }}>
                  CredVora
                </span>{" "}
                &mdash; Financial Wellness, Simplified.
                <br />
                <span style={{ fontSize: 12, color: "#9ca3af" }}>
                  This is an automated alert. Please do not reply.
                </span>
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    padding: 0,
    margin: 0,
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "40px auto",
    padding: "32px 24px",
    borderRadius: "8px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
    maxWidth: "480px",
  },
  title: {
    color: "#1f2937",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 0 24px",
    letterSpacing: "-1px",
  },
  text: {
    color: "#374151",
    fontSize: "16px",
    margin: "0 0 16px",
    lineHeight: "1.6",
  },
  statsContainer: {
    margin: "32px 0 16px",
    padding: "20px",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap",
  },
  stat: {
    flex: "1 1 30%",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    padding: "16px 8px",
    textAlign: "center",
    minWidth: "100px",
  },
  statLabel: {
    color: "#6b7280",
    fontSize: "13px",
    marginBottom: "6px",
    display: "block",
    fontWeight: 500,
  },
  statValue: {
    color: "#1f2937",
    fontSize: "20px",
    fontWeight: 700,
    margin: 0,
  },
  footer: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
  },
};
