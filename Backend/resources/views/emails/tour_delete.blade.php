<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tour Cancellation Notification</title>
</head>
<body>
    <div style="background-color: #f3f2f2;">
        <div style="padding: 15px; width: 600px; margin: 20px auto;">
            <h2 style="margin: 0; padding: 15px; border-top-left-radius: 10px; border-top-right-radius: 10px; background-color: #0275d8; color: #ffffff;">
                Tour Cancellation Notification
            </h2>
            <div style="margin: 0; padding: 15px; background-color: #ffffff;">
                <p>Hi {{ $landlord->first_name }},</p>
                <p>The tour request for your property, {{ $property->title }}, has been cancelled by the user: {{ $user->first_name}} {{$user->last_name}}.</p>
                <p>Best regards,<br>The RentEZ Team</p>
            </div>
        </div>
    </div>
</body>
</html>
