const sgMail=require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail=async(options)=>{
    const msg={
        to:options.email,
        from:process.env.FROM_EMAIL,
        subject:options.subject,
        html:`<div style='border:2px solid red';>${options.detail}</div>`,

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