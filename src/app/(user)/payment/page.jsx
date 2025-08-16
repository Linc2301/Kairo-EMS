// pages/fake-payment.jsx
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
    IconButton,
    Link
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";

// Payment method data with logos
const paymentMethods = [
    {
        id: "visa",
        name: "Mastercard",
        logo: "/master-card.png",
        supportsCurrency: ['USD'],
        fields: ['cardNumber', 'expiry', 'cvv'],

    },
    {
        id: "kbz",
        name: "KBZ Pay",
        logo: "/kbz.png",
        supportsCurrency: ['MMK'],
        fields: ['phone', 'pin'],

    },
    {
        id: "wave",
        name: "Wave Pay",
        logo: "/wave.png",
        supportsCurrency: ['MMK'],
        fields: ['phone', 'pin'],

    },
    {
        id: "paypal",
        name: "PayPal",
        logo: "/paypal.png",
        supportsCurrency: ['USD'],
        fields: ['paypalEmail'],

    }
];

const INITIAL_EXCHANGE_RATE = 2100;

export default function FakePayment() {
    const [method, setMethod] = useState("visa");
    const [currency, setCurrency] = useState("USD");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");
    const [paypalEmail, setPaypalEmail] = useState("");
    const [showPin, setShowPin] = useState(false);
    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState("");
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(INITIAL_EXCHANGE_RATE);
    const [isFetchingRate, setIsFetchingRate] = useState(false);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            setIsFetchingRate(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                const randomRate = 2100 + (Math.random() * 100 - 50);
                setExchangeRate(randomRate.toFixed(2));
            } catch (err) {
                console.error("Failed to fetch exchange rate", err);
                setExchangeRate(INITIAL_EXCHANGE_RATE);
            } finally {
                setIsFetchingRate(false);
            }
        };

        fetchExchangeRate();
    }, []);

    const handleCurrencyChange = (event, newCurrency) => {
        if (newCurrency !== null) {
            setCurrency(newCurrency);
            setAmount("");
            setConvertedAmount("");

            const availableMethods = paymentMethods.filter(m =>
                m.supportsCurrency.includes(newCurrency)
            );
            if (availableMethods.length > 0 && !availableMethods.some(m => m.id === method)) {
                setMethod(availableMethods[0].id);
            }
        }
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);

        if (value && !isNaN(value)) {
            if (currency === "USD") {
                setConvertedAmount((value * exchangeRate).toFixed(2));
            } else {
                setConvertedAmount((value / exchangeRate).toFixed(2));
            }
        } else {
            setConvertedAmount("");
        }
    };

    const handlePinChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,4}$/.test(value)) {
            setPin(value);
        }
    };

    const validateForm = () => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            setError("Please enter a valid amount");
            return false;
        }

        const selectedMethod = paymentMethods.find(m => m.id === method);

        if (selectedMethod.fields.includes('cardNumber') &&
            (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16)) {
            setError("Please enter a valid 16-digit card number");
            return false;
        }

        if (selectedMethod.fields.includes('expiry') &&
            (!expiry || !expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/))) {
            setError("Please enter a valid expiry date (MM/YY)");
            return false;
        }

        if (selectedMethod.fields.includes('cvv') && (!cvv || cvv.length !== 3)) {
            setError("Please enter a valid 3-digit CVV");
            return false;
        }

        if (selectedMethod.fields.includes('phone') &&
            (!phone || !phone.match(/^09\d{9}$/))) {
            setError("Please enter a valid Myanmar phone number (09XXXXXXXX)");
            return false;
        }

        if (selectedMethod.fields.includes('pin') && pin.length !== 4) {
            setError("Please enter a valid 4-digit PIN");
            return false;
        }

        if (selectedMethod.fields.includes('paypalEmail') &&
            (!paypalEmail || !paypalEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))) {
            setError("Please enter a valid PayPal email address");
            return false;
        }

        if (!selectedMethod.supportsCurrency.includes(currency)) {
            setError(`${selectedMethod.name} doesn't support ${currency} payments`);
            return false;
        }

        return true;
    };

    const simulatePayment = () => {
        const isSuccess = Math.random() > 0.1;
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(isSuccess);
            }, 2000);
        });
    };

    const handlePayment = async () => {
        setError(null);
        setStatus(null);

        if (!validateForm()) {
            setOpenSnackbar(true);
            return;
        }

        setIsLoading(true);

        try {
            const isSuccessful = await simulatePayment();

            if (isSuccessful) {
                setStatus({
                    message: `Payment of ${currency === 'USD' ? '$' : ''}${amount}${currency === 'MMK' ? ' MMK' : ''} via ${paymentMethods.find(m => m.id === method).name} successful!`,
                    severity: "success"
                });
                setCardNumber("");
                setExpiry("");
                setCvv("");
                setPhone("");
                setPin("");
                setPaypalEmail("");
                setAmount("");
                setConvertedAmount("");
            } else {
                setStatus({
                    message: `Payment failed. Please try again or use a different payment method.`,
                    severity: "error"
                });
            }
        } catch (err) {
            setStatus({
                message: "An error occurred during payment processing",
                severity: "error"
            });
        } finally {
            setIsLoading(false);
            setOpenSnackbar(true);
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

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const filteredPaymentMethods = paymentMethods.filter(method =>
        method.supportsCurrency.includes(currency)
    );

    const currentMethod = paymentMethods.find(m => m.id === method);

    return (
        <Container maxWidth="sm" sx={{ mt: 6, mb: 10 }}>
            <Typography variant="h4" mb={3} align="center">
                Payment Gateway
            </Typography>


            <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h6" mb={2}>
                        Select Currency
                    </Typography>

                    <ToggleButtonGroup
                        value={currency}
                        exclusive
                        onChange={handleCurrencyChange}
                        fullWidth
                        sx={{ mb: 3 }}
                    >
                        <ToggleButton value="USD" sx={{ py: 1.5 }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Image
                                    src="/USD.png"
                                    alt="USD"
                                    width={24}
                                    height={16}
                                    style={{ borderRadius: '2px' }}
                                />
                                <Typography>USD</Typography>
                            </Stack>
                        </ToggleButton>
                        <ToggleButton value="MMK" sx={{ py: 1.5 }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Image
                                    src="/MMK.png"
                                    alt="MMK"
                                    width={24}
                                    height={16}
                                    style={{ borderRadius: '2px' }}
                                />
                                <Typography>MMK</Typography>
                            </Stack>
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <Typography variant="h6" mb={2}>
                        Select Payment Method
                    </Typography>

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
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        borderColor: '#1976d2',
                                        bgcolor: '#f0f7ff'
                                    }
                                }}
                            >
                                <Avatar
                                    variant="square"
                                    sx={{
                                        width: 60,
                                        height: 40,
                                        bgcolor: 'transparent'
                                    }}
                                >
                                    <Image
                                        src={pm.logo}
                                        alt={pm.name}
                                        width={60}
                                        height={40}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Avatar>
                                <Typography variant="caption" mt={1}>
                                    {pm.name}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>



                    {currentMethod.fields.includes('cardNumber') && (
                        <TextField
                            label="Card Number"
                            fullWidth
                            value={formatCardNumber(cardNumber)}
                            onChange={(e) => setCardNumber(e.target.value)}
                            inputProps={{ maxLength: 19 }}
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
                                onChange={(e) => setExpiry(e.target.value)}
                                placeholder="12/34"
                                inputProps={{ maxLength: 5 }}
                            />
                            <TextField
                                label="CVV"
                                fullWidth
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                                inputProps={{ maxLength: 3 }}
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
                            inputProps={{ maxLength: 11 }}
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
                            inputProps={{ maxLength: 4 }}
                            sx={{ mb: 2 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPin(!showPin)}
                                            edge="end"
                                        >
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

                    <TextField
                        label={`Amount (${currency})`}
                        fullWidth

                        value={amount}
                        onChange={handleAmountChange}
                        sx={{ mb: 1 }}
                        InputProps={{
                            startAdornment: (
                                <Typography mr={1}>
                                    {currency === 'USD' ? '$' : 'MMK '}
                                </Typography>
                            ),
                        }}
                    />

                    {convertedAmount && (
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            ≈ {currency === 'USD' ? `${convertedAmount} MMK` : `$${convertedAmount} USD`}
                        </Typography>
                    )}

                    <Divider sx={{ my: 2 }} />

                    {isLoading && <LinearProgress sx={{ mb: 2 }} />}

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handlePayment}
                        disabled={isLoading}
                        size="large"
                        sx={{ py: 1.5 }}
                    >
                        {isLoading ? 'Processing...' : 'Pay Now'}
                    </Button>

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert
                            onClose={handleCloseSnackbar}
                            severity={error ? "error" : status?.severity || "info"}
                            sx={{ width: '100%' }}
                        >
                            {error || status?.message}
                        </Alert>
                    </Snackbar>
                </CardContent>
            </Card>


        </Container>
    );
}