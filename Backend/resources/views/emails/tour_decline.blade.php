<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tour Request Declined</title>
</head>
<body>
    <div style="background-color: #f3f2f2;">
        <div style="padding: 15px; width: 600px; margin: 20px auto;">
            <h2 style="margin: 0; padding: 15px; border-top-left-radius: 10px; border-top-right-radius: 10px; background-color: #d9534f; color: #ffffff;">
                Tour Request Declined for Property: {{ $property->title }}
            </h2>
            <div style="margin: 0; padding: 15px; background-color: #ffffff;">
                <p style="text-transform: capitalize">Hi {{ $user->first_name }},</p>
                <p>We regret to inform you that your tour request for the property {{ $property->title }} has been declined by the landlord.</p>
                <p><strong>Reason:</strong></p>
                <p>{{ $messageContent }}</p>
                <p>Thank you for understanding.</p>
                <p>The RentEZ Team</p>
            </div>
        </div>
    </div>
</body>
</html>
