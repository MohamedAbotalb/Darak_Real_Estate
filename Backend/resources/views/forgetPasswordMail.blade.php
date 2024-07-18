<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $data['title'] }}</title>
</head>
<body>
    <div style="background-color: #f3f2f2;">
        <div style="padding: 15px; width: 600px; margin: 20px auto;">
            <h2 style="margin: 0; padding: 15px; border-top-left-radius: 10px; border-top-right-radius: 10px; background-color: #0275d8; color: #ffffff;">
                {{ $data['title'] }}
            </h2>
            <div style="margin: 0; padding: 15px; background-color: #ffffff;">
                <p style="text-transform: capitalize">hi {{ $data['user']->first_name }},</p>
                <p>We received a request to reset the password for your account for this email address. Please click on the
                    button below to reset your password.</p>
                <a href="{{ $data['url'] }}"
                style="border: 0; color: #ffffff; background-color: #0275d8; padding: 15px; font-weight: bold;
                text-decoration: none; border-radius: 5px; font-size: 1rem; margin-top: 20px; display: inline-block;">
                    Reset my password
                </a>
                <p style="margin-top: 30px;">Or you can copy the link below to your browser</p>
                <p>{{ $data['url'] }}</p>
                <p>Darak Team</p>
            </div>
        </div>
    </div>
</body>
</html>