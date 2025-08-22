"use client";

import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    LinearProgress,
    Alert,
    Snackbar,
    Card,
    CardContent,
    Avatar,
    Stack,
    ToggleButtonGroup,
    ToggleButton,
    Divider,
    InputAdornment,
    IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

const paymentMethods = [
    {
        id: "visa",
        name: "Visa/Mastercard",
        logo: "/master-card.png",
        supportsCurrency: ["USD"],
        fields: ["cardNumber", "expiry", "cvv"],
    },
    {
        id: "kbz",
        name: "KBZ Pay",
        logo: "/kbz.png",
        supportsCurrency: ["MMK"],
        fields: ["phone", "pin"],
    },
    {
        id: "wave",
        name: "Wave Pay",
        logo: "/wave.png",
        supportsCurrency: ["MMK"],
        fields: ["phone", "pin"],
    },
    {
        id: "paypal",
        name: "PayPal",
        logo: "/paypal.png",
        supportsCurrency: ["USD"],
        fields: ["paypalEmail"],
    }
];

const INITIAL_EXCHANGE_RATE = 2100;

export default function FakePayment({ totalAmount, onSuccess }) {
    const router = useRouter();
    const [method, setMethod] = useState("visa");
    const [currency, setCurrency] = useState("USD");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");
    const [paypalEmail, setPaypalEmail] = useState("");
    const [showPin, setShowPin] = useState(false);
    const [convertedAmount, setConvertedAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(INITIAL_EXCHANGE_RATE);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                const randomRate = 2100 + (Math.random() * 100 - 50);
                setExchangeRate(randomRate.toFixed(2));
            } catch (err) {
                console.error("Failed to fetch exchange rate", err);
                setExchangeRate(INITIAL_EXCHANGE_RATE);
            }
        };
        fetchExchangeRate();
    }, []);

    useEffect(() => {
        if (totalAmount) {
            if (currency === "USD") {
                setConvertedAmount((totalAmount / exchangeRate).toFixed(2));
            } else {
                setConvertedAmount(totalAmount);
            }
        }
    }, [totalAmount, currency, exchangeRate]);

    const handleCurrencyChange = (event, newCurrency) => {
        if (newCurrency !== null) {
            setCurrency(newCurrency);
            const availableMethods = paymentMethods.filter(m =>
                m.supportsCurrency.includes(newCurrency)
            );
            if (availableMethods.length > 0 && !availableMethods.some(m => m.id === method)) {
                setMethod(availableMethods[0].id);
            }
        }
    };

    const handlePinChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,4}$/.test(value)) {
            setPin(value);
        }
    };

    // Fixed handlePayment function - remove the PATCH request logic
    const handlePayment = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Validate payment fields based on selected method
            const currentMethod = paymentMethods.find(m => m.id === method);

            if (currentMethod.fields.includes('cardNumber') && !cardNumber) {
                throw new Error('Please enter card number');
            }
            if (currentMethod.fields.includes('expiry') && !expiry) {
                throw new Error('Please enter expiry date');
            }
            if (currentMethod.fields.includes('cvv') && !cvv) {
                throw new Error('Please enter CVV');
            }
            if (currentMethod.fields.includes('phone') && !phone) {
                throw new Error('Please enter phone number');
            }
            if (currentMethod.fields.includes('pin') && !pin) {
                throw new Error('Please enter PIN');
            }
            if (currentMethod.fields.includes('paypalEmail') && !paypalEmail) {
                throw new Error('Please enter PayPal email');
            }

            // Simulate payment processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate payment success (you can add validation logic here)
            const paymentDetails = {
                method,
                currency,
                amount: currency === "USD" ? convertedAmount : totalAmount,
                cardNumber: cardNumber ? cardNumber.replace(/\d(?=\d{4})/g, "*") : null,
                phone: phone || null,
                paypalEmail: paypalEmail || null,
                timestamp: new Date().toISOString()
            };

            // Call the parent component's success handler
            if (onSuccess) {
                await onSuccess(paymentDetails);
            }

        } catch (err) {
            console.error("Payment failed:", err);
            setError(err.message || "Payment processing failed. Please try again.");
            setOpenSnackbar(true);
        } finally {
            setIsLoading(false);
        }
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        return parts.length ? parts.join(' ') : value;
    };

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        if (formatted.length <= 19) { // 16 digits + 3 spaces
            setCardNumber(formatted);
        }
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        setExpiry(value);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setError(null);
    };

    const filteredPaymentMethods = paymentMethods.filter(method =>
        method.supportsCurrency.includes(currency)
    );

    const currentMethod = paymentMethods.find(m => m.id === method);

    return (
        <Container maxWidth="sm" sx={{ mt: 2, mb: 4 }}>
            <Typography variant="h4" mb={3} align="center">
                Payment Gateway
            </Typography>

            <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                    {/* Currency Selection */}
                    <Typography variant="h6" mb={2}>Select Currency</Typography>
                    <ToggleButtonGroup
                        value={currency}
                        exclusive
                        onChange={handleCurrencyChange}
                        fullWidth
                        sx={{ mb: 3 }}
                    >
                        <ToggleButton value="USD" sx={{ py: 1.5 }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Image src="/USD.png" alt="USD" width={24} height={16} />
                                <Typography>USD</Typography>
                            </Stack>
                        </ToggleButton>
                        <ToggleButton value="MMK" sx={{ py: 1.5 }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Image src="/MMK.png" alt="MMK" width={24} height={16} />
                                <Typography>MMK</Typography>
                            </Stack>
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {/* Amount */}
                    <Box sx={{
                        mb: 3,
                        p: 2,
                        backgroundColor: '#f5f5f5',
                        borderRadius: 1,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Typography fontWeight="bold">Total Amount:</Typography>
                        <Typography fontWeight="bold">
                            {currency === "USD" ? `$${convertedAmount}` : `${totalAmount} MMK`}
                        </Typography>
                    </Box>

                    {/* Payment Methods */}
                    <Typography variant="h6" mb={2}>Select Payment Method</Typography>
                    <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
                        {filteredPaymentMethods.map((pm) => (
                            <Box
                                key={pm.id}
                                onClick={() => setMethod(pm.id)}
                                sx={{
                                    p: 2,
                                    border: method === pm.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    minWidth: 100,
                                    bgcolor: method === pm.id ? '#f0f7ff' : 'background.paper',
                                }}
                            >
                                <Avatar variant="square" sx={{ width: 60, height: 40, bgcolor: 'transparent' }}>
                                    <Image src={pm.logo} alt={pm.name} width={60} height={40} />
                                </Avatar>
                                <Typography variant="caption" mt={1}>{pm.name}</Typography>
                            </Box>
                        ))}
                    </Stack>

                    {/* Dynamic Fields */}
                    {currentMethod.fields.includes('cardNumber') && (
                        <TextField
                            label="Card Number"
                            fullWidth
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="4242 4242 4242 4242"
                            sx={{ mb: 2 }}
                        />
                    )}
                    {currentMethod.fields.includes('expiry') && (
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <TextField
                                label="Expiry (MM/YY)"
                                fullWidth
                                value={expiry}
                                onChange={handleExpiryChange}
                                placeholder="12/25"
                            />
                            <TextField
                                label="CVV"
                                fullWidth
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))}
                                placeholder="123"
                            />
                        </Box>
                    )}
                    {currentMethod.fields.includes('phone') && (
                        <TextField
                            label="Phone Number"
                            fullWidth
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="09XXXXXXXX"
                            sx={{ mb: 2 }}
                        />
                    )}
                    {currentMethod.fields.includes('pin') && (
                        <TextField
                            label="4-Digit PIN"
                            fullWidth
                            type={showPin ? "text" : "password"}
                            value={pin}
                            onChange={handlePinChange}
                            sx={{ mb: 2 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPin(!showPin)} edge="end">
                                            {showPin ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                    {currentMethod.fields.includes('paypalEmail') && (
                        <TextField
                            label="PayPal Email"
                            fullWidth
                            value={paypalEmail}
                            onChange={(e) => setPaypalEmail(e.target.value)}
                            placeholder="your@email.com"
                            sx={{ mb: 2 }}
                        />
                    )}

                    <Divider sx={{ my: 3 }} />

                    {/* Loading Progress */}
                    {isLoading && <LinearProgress sx={{ mb: 2 }} />}

                    {/* Pay Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handlePayment}
                        disabled={isLoading}
                        sx={{
                            py: 1.5,
                            fontSize: '1.1rem',
                            bgcolor: '#1976d2',
                            '&:hover': {
                                bgcolor: '#1565c0',
                            },
                        }}
                    >
                        {isLoading ? 'Processing Payment...' : `Pay ${currency === "USD" ? `$${convertedAmount}` : `${totalAmount} MMK`}`}
                    </Button>

                    {/* Cancel Button */}
                    <Button
                        variant="outlined"
                        fullWidth
                        size="large"
                        onClick={() => window.history.back()}
                        disabled={isLoading}
                        sx={{ mt: 2, py: 1.5 }}
                    >
                        Cancel
                    </Button>
                </CardContent>
            </Card>

            {/* Error Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
}