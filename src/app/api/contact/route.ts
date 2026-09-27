import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
        }

        const apiKey = process.env.BREVO_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'Configuração de e-mail ausente.' }, { status: 500 });
        }

        const payload = {
            sender: { name: 'Portfolio Contact', email: 'andersonbteixeira@outlook.com' },
            to: [{ email: 'andersonbteixeira@outlook.com', name: 'Anderson' }],
            replyTo: { email, name },
            subject: `Nova mensagem de contato: ${name}`,
            htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0f1e; color: #e2e8f0; border-radius: 12px;">
          <h2 style="color: #06b6d4; margin-bottom: 8px;">Nova mensagem do portfólio</h2>
          <hr style="border-color: #1e293b; margin-bottom: 24px;" />
          <p style="margin-bottom: 8px;"><strong style="color: #94a3b8;">Nome:</strong> ${name}</p>
          <p style="margin-bottom: 8px;"><strong style="color: #94a3b8;">E-mail:</strong> ${email}</p>
          <p style="margin-bottom: 8px;"><strong style="color: #94a3b8;">Mensagem:</strong></p>
          <p style="background: #1e293b; padding: 16px; border-radius: 8px; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</p>
          <hr style="border-color: #1e293b; margin-top: 24px;" />
          <p style="font-size: 12px; color: #475569;">Enviado via formulário de contato do portfólio</p>
        </div>
      `,
        };

        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Brevo API error:', errorData);
            return NextResponse.json({ error: 'Falha ao enviar e-mail. Tente novamente.' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 });
    }
}
