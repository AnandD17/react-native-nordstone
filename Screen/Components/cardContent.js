export const CardContent = ({ user }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        body{
            font-family: 'Poppins', sans-serif;
        }
        </style>
</head>
<body style="display:flex; align-items: center; justify-content: center">
    <div id="email"
        style="max-width:450px;min-width: 450px;border: solid 1px #000 !important; overflow: hidden;">
        <!-- Header -->
        <table role="presentation" border="0" cellspacing="0" width="100%">
            <tr style="background-color: #01499D; color: white;">
                <td style="padding: 12px; padding-right: 10px;">
                    <img src="https://nexenstial.com/peoplescare/images/logo.png" width="80" alt="">
                </td>
                <td colspan="4" style="font-size: 12px; font-weight: 550; padding: 12px;padding-left: 10px; text-align: center;">
                    <p>
                        ಕರ್ನಾಟಕ ರಾಜ್ಯ ಆರೋಗ್ಯ ಮತ್ತು ಕುಟುಂಬ ಕಲ್ಯಾಣ ಇಲಾಖೆಯ NHM ಒಳಗುತ್ತಿಗೆ ನೌಕರರ ಸಂಘ (ರಿ)
                    </p>
                    <p style="font-weight: 400; font-size: 11px;">
                        ನೋಂದಣಿ ಸಂಖ್ಯೆ : DRB1/SOR/409/2022-2023
                        ಕಲ್ಪವೃಕ್ಷ, ಎಸ್, ಎಸ್, ಎನ್‌ಕ್ಲೇವ್, ಪ್ಲಾಟ ನಂ. ಎಸ್-1, ಎರಡನೇ ಮಹಡಿ,
                        ಇಂಡಿಯನ್ ಎಕ್ಷಪ್ರೆಸ್ ಲೇಔಟ, ಕೊಡೆಗೆನಹಳ್ಳಿ, ಬೆಂಗಳೂರು-560097
                    </p>
                </td>
            </tr>
        </table>
        <!-- Body -->
        <table role="presentation" border="0" cellspacing="0" width="100%" style="height: 450px; background-color: #F0F8FE;">
            <tr style="min-height: 100%; display: flex; flex-direction: column;  justify-content: center; align-items: center; margin-top: 20px;">
                <!-- Person Image -->
                <td>
                    <div>
                        <img src=${user?.avatar?.secure_url}
                            style="width: 150px; height: 150px; object-fit: cover;">
                    </div>
                </td>
                <!-- Person Details -->
                <td>
                    <table role="presentation" border="0" cellspacing="0" width="100%" style=" text-align: center;">
                        <tr>
                            <td>
                                ID No.: DRB1/SOR/409/${user?.userId}
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 32px; font-weight: 550;">
                                ${user?.name}
                            </td>
                        </tr>
                        <tr >
                            <td style="margin-bottom: 30px;">
                                ${user?.designation}
                            </td>
                        </tr>
                        <tr>
                            <td>
                               <strong> Mobile : </strong> ${user?.mobile}
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <strong> Blood Group : </strong> ${user?.bloodGroup}
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <strong>  Date of Birth : </strong> ${user?.dateOfBirth?.split("T")[0]}
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <strong> Date of Joining : </strong> ${user?.dateOfJoining?.split("T")[0]}
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <strong>  Working Place : </strong> ${user?.placeOfWork}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
`;