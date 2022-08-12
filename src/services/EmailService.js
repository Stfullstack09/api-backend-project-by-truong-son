require('dotenv').config();
import nodemailer from 'nodemailer';

class EmailService {
    async sendSimpleEmail(dataSend) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            // debug: true,
            // logger: true,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_APP_NAME, // generated ethereal user
                pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'Trường Sơn Booking', // sender address
            to: dataSend.email, // list of receivers
            subject: 'Thông tin đặt lịch khám bệnh của bạn !', // Subject line
            html: this.getLanguageBodyHTML(dataSend), // html body
        });
    }

    getLanguageBodyHTML = (dataSend) => {
        let Result = '';

        if (dataSend.language === 'vi') {
            Result = `

            <div>
            <h3>Xin chào bạn ${dataSend.patientName} cảm ơn bạn đã đặt lịch khám tại wesite của chúng tôi !</h3>
            <p>Bạn nhận được email này khi bạn đã thực hiện việc đặt lịch khám online trên <strong>Trường Sơn Booking</strong></p>
            <p><strong>Thông tin đặt lịch khám bệnh của bạn :</strong></p>
            <div>
                <b>Thời gian: ${dataSend.time}</b>
                
            </div>
            <div>
                <b>Bác sĩ khám bệnh: ${dataSend.doctorName}</b>
                </div>
            <div>
                    <p>Nếu thông tin bên trên là <strong>đúng</strong> thì xin vui lòng click vào đường dẫn sau để xác nhận hoàn tất thử tục khám bệnh</p>
                    <a href=${dataSend.redirectLink} target="_blank">click here</a>
                </div>
                <div>
                <h4>Cảm ơn bạn đã đặt lịch khám tại Trường Sơn Sơn Booking</h4>
                </div>
            </div>

        `;
        }

        if (dataSend.language === 'en') {
            Result = `

                <div>
                <h3>Hello ${dataSend.patientName} Thank you for booking an appointment on our website !</h3>
                <p>You will receive this email when you have made an online appointment on <strong>Trường Sơn Booking</strong></p>
                <p><strong>Your medical appointment booking information :</strong></p>
                <div>
                    <b>Time: ${dataSend.time}</b>
                    
                </div>
                <div>
                    <b>The doctor is doing the examination: ${dataSend.doctorName}</b>
                    </div>
                <div>
                        <p>If the above information is <strong>correct</strong> Please click on the following link to confirm the completion of the medical examination</p>
                        <a href=${dataSend.redirectLink} target="_blank">click here</a>
                    </div>
                    <div>
                    <h4>Thank you for booking an appointment at Trường Sơn Sơn Booking</h4>
                    </div>
                </div>

            `;
        }

        return Result;
    };
}

export default new EmailService();
