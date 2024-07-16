<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Update Notification</title>
</head>
<body>
    <div style="background-color: #f3f2f2;">
        <div style="padding: 15px; width: 600px; margin: 20px auto;">
            <h2 style="margin: 0; padding: 15px; border-top-left-radius: 10px; border-top-right-radius: 10px; background-color: #0275d8; color: #ffffff;">
                Property Update for {{ $property->title }}
            </h2>
            <div style="margin: 0; padding: 15px; background-color: #ffffff;">
                <p style="text-transform: capitalize">Hi {{ $user->first_name }},</p>
                <p>The property {{ $property->title }} you requested a tour for has been updated.</p>
                <p>Please review the updated details of the property and make sure it still meets your requirements.</p>
                <p>Thank you!</p>
                <p>Darak Team</p>
            </div>
        </div>
    </div>
</body>
</html>
