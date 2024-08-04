import React, { useState } from 'react';
import { Configuration, TranslateDto, TranslatorApi } from '../lib/translator-sdk';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/Container';

const TranslatorComponent: React.FC = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [inputLanguage, setInputLanguage] = useState('en');
    const [translations, setTranslations] = useState([{ id: 1, outputLanguage: 'fr', translatedText: '' }]);

    const config = new Configuration({ basePath: 'http://localhost:3000' });
    const translator_api = new TranslatorApi(config);

    const handleTranslate = () => {
        translations.forEach((translation, index) => {
            const requestBody: TranslateDto = {
                inputMessage: inputMessage,
                inputLanguage: inputLanguage,
                outputLanguage: translation.outputLanguage,
            };
            translator_api.translatorControllerTranslateText(requestBody).then((response) => {
                setTranslations((prevTranslations) => {
                    const newTranslations = [...prevTranslations];
                    newTranslations[index].translatedText = response.data;
                    return newTranslations;
                });
            });
        });
    };

    const handleAddTranslationRow = () => {
        setTranslations([
            ...translations,
            { id: translations.length + 1, outputLanguage: '', translatedText: '' },
        ]);
    };

    const handleOutputLanguageChange = (id: number, value: string) => {
        setTranslations((prevTranslations) =>
            prevTranslations.map((translation) =>
                translation.id === id ? { ...translation, outputLanguage: value } : translation
            )
        );
    };

    const handleDeleteRow = (id: number) => {
        setTranslations((prevTranslations) =>
            prevTranslations.filter((translation) => translation.id !== id)
        );
    };

    return (
        <div className='translator-container'>
            <h1>
                🇩🇪<i className='bi bi-forward-fill'></i>🇿🇼🇵🇬🇮🇷
            </h1>
            <div className='card-container'>
                <div className='card'>
                    <input
                        type='text'
                        value={inputLanguage}
                        onChange={(e) => setInputLanguage(e.target.value)}
                        placeholder='Input Language (e.g., en)'
                        className='input-field small-input'
                    />
                    <input
                        type='text'
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder='Enter text to translate'
                        className='input-field'
                    />
                </div>

                <Button className='translate-button' onClick={handleTranslate}>
                    <i className='bi bi-forward-fill'></i>
                </Button>
                {translations.map((translation) => (
                    <Card key={translation.id}>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Col>
                                        <Button
                                            variant='danger'
                                            onClick={() => handleDeleteRow(translation.id)}
                                        >
                                            <i className='bi bi-trash'></i>
                                        </Button>
                                    </Col>
                                    <Col>
                                        <input
                                            type='text'
                                            value={translation.outputLanguage}
                                            onChange={(e) =>
                                                handleOutputLanguageChange(translation.id, e.target.value)
                                            }
                                            placeholder='Output Language (e.g., fr)'
                                            className='input-field small-input'
                                        />
                                        {translation.translatedText && (
                                            <span className='translated-text'>
                                                {'->'} {translation.translatedText}
                                            </span>
                                        )}
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <Button variant='success' onClick={handleAddTranslationRow}>
                <i className='bi bi-plus-lg'></i>
            </Button>
        </div>
    );
};

export default TranslatorComponent;
