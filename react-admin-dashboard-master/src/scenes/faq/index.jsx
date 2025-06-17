import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          How do I know if an online store is legitimate?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Answer: Check for reviews and ratings from other customers, ensure the website has secure payment options (look for "https" in the URL), and verify contact information. Trusted sites often have recognizable security certifications and clear return policies.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          What should I do if I receive a damaged or incorrect item?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Answer: Contact the retailer’s customer service as soon as possible. Provide details and photos of the damaged or incorrect item. Most reputable online stores will offer a return or exchange process and cover return shipping costs if the mistake was on their end.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          How can I track my online order?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Answer: After your order is placed, you should receive a confirmation email with a tracking number and a link to track your shipment. You can also log in to your account on the retailer's website to view order status and tracking information.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What payment methods are usually accepted for online purchases?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Answer: Most online retailers accept credit and debit cards, PayPal, and other digital payment methods. Some may also accept bank transfers or offer financing options. Check the payment section during checkout for available options.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Are my payment details safe when shopping online?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Answer: Reputable online stores use secure encryption protocols (like SSL) to protect your payment information. Look for “https” in the website URL and a padlock symbol in the browser’s address bar. Avoid entering payment details on sites without these security features.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Can I cancel or change my order after placing it?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Answer: It depends on the retailer’s policy and the status of your order. Contact customer service as soon as possible to request a cancellation or change. Orders that are already in processing or have been shipped may not be changeable, but some retailers allow cancellations within a certain time frame.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          How do I return an item if I am not satisfied with it?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Answer: Review the retailer’s return policy, which is usually found on their website. Follow the instructions for initiating a return, which often includes filling out a return form and sending the item back using a provided shipping label or address. Ensure the item is in its original condition and packaging.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Are there any hidden fees when shopping online?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Answer: Hidden fees can include shipping charges, handling fees, or import duties for international purchases. Always review the total cost at checkout, including taxes and shipping, to understand the full price before finalizing your purchase.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
