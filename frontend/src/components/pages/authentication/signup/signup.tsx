import { useState, VFC } from 'react';
import PageTitle from 'components/pages/authentication/pageTitle';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { Identification } from './identification';

const SContainer = styled(Container)`
  padding: 20px;
  text-align: center;
`;
const SBox = styled(Box)`
  max-width: 600px;
  padding: 20px 5px;
  margin: 0 auto 40px auto;
`;

const getContent = (index: number) => {
  switch (index) {
    case 0:
      return <Identification />;
    default:
      return null;
  }
};

/**
 * ユーザー登録ページ
 */
const SignUp: VFC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps: string[] = ['本人確認', 'プロフィール入力', '入力確認', '完了'];
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <SContainer maxWidth="sm">
      <SBox>
        <PageTitle title="ユーザー登録" />
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            // if (isStepSkipped(index)) {
            //   stepProps.completed = false;
            // }
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div id="step-wrapper">{getContent(activeStep)}</div>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {activeStep > 1 && (
            <>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : '次へ'}
              </Button>
            </>
          )}
        </Box>
      </SBox>
    </SContainer>
  );
};
export { SignUp };
