const sgMail=require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail=async(options)=>{
    if (!process.env.SENDGRID_API_KEY) {
        throw new Error("SENDGRID_API_KEY is missing");
    }
    if (!process.env.FROM_EMAIL) {
        throw new Error("FROM_EMAIL is missing");
    }

    const msg={
        to:options.email,
        from:process.env.FROM_EMAIL,
        subject:options.subject,
        text:`Your Job Portal verification code is ${options.detail}. It expires in 1 hour.`,
        html:`<div style="font-family:Arial,sans-serif;border:2px solid #ef4444;padding:16px"><p>Your Job Portal verification code is:</p><strong style="font-size:24px">${options.detail}</strong><p>This code expires in 1 hour.</p></div>`,
    };
    try{
        await sgMail.send(msg);
        console.log("email send successfully");
    }catch(err){
        console.error('sendgrid error:',err.response ? err.response.body:err);
        throw new Error("Cant send email");
    }
};
module.exports={sendEmail};