import {
  Body,
  Button,
  Container,
  Heading,
  Hr,
  Html,
  Section,
  Text,
} from "@react-email/components";

interface InvitationEmailProps {
  userEmail: string;
  tempPassword: string;
}

export default function InvitationEmail({
  userEmail,
  tempPassword,
}: InvitationEmailProps) {
  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            Welcome to Proptech Property Management 👋
          </Heading>

          <Text style={text}>
            You have been invited to join{" "}
            <strong>Proptech Property Management</strong>.
          </Text>

          <Text style={text}>
            An account has been created for you using the email address below:
          </Text>

          <Section style={credentialsBox}>
            <Text style={credential}>
              <strong>Email:</strong> {userEmail || "shake@example.com"}
            </Text>
            <Text style={credential}>
              <strong>Temporary Password:</strong>{" "}
              {tempPassword || "Wdh5YTdjR743"}
            </Text>
          </Section>

          <Text style={text}>
            For security reasons, please log in and create your own password.
          </Text>

          <Section style={buttonContainer}>
            <Button
              href="https://streeio-core-umber.vercel.app/"
              style={button}
            >
              Create Your Password
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            If you did not expect this invitation, you can safely ignore this
            email.
          </Text>

          <Text style={footer}>— Proptech Property Management Team</Text>
        </Container>
      </Body>
    </Html>
  );
}

/* =======================
   Styles
======================= */

const main = {
  backgroundColor: "#f4f6f8",
  fontFamily: "Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px",
  borderRadius: "8px",
  maxWidth: "520px",
};

const heading = {
  color: "#111827",
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "12px",
};

const text = {
  color: "#374151",
  fontSize: "15px",
  lineHeight: "24px",
  marginBottom: "14px",
};

const credentialsBox = {
  backgroundColor: "#f9fafb",
  padding: "16px",
  borderRadius: "6px",
  marginBottom: "16px",
};

const credential = {
  fontSize: "14px",
  margin: "6px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "28px 0",
};

const button = {
  backgroundColor: "#382AB1",
  color: "#ffffff",
  padding: "12px 22px",
  borderRadius: "6px",
  fontSize: "14px",
  textDecoration: "none",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const footer = {
  color: "#6b7280",
  fontSize: "12px",
  lineHeight: "18px",
};
