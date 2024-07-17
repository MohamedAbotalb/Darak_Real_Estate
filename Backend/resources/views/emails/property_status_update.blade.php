<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Status Update</title>
</head>
<body>
    <div style="background-color: #f3f2f2;">
        <div style="padding: 15px; width: 600px; margin: 20px auto;">
            <h2 style="margin: 0; padding: 15px; border-top-left-radius: 10px; border-top-right-radius: 10px; background-color: #0275d8; color: #ffffff;">
                Property Status Update for: {{ $property->title }}
            </h2>
            <div style="margin: 0; padding: 15px; background-color: #ffffff;">
                <p style="text-transform: capitalize">Hi {{ $user->first_name }},</p>
                <p>{{ $messageContent }}</p>
                @if($status === 'rejected')
                <p>In order to ensure the acceptance of your apartment:</p>
                <ul>
                    <li> provide a clear and detailed description of the property.</li>
                    <li> Avoid using low-quality photos, stock images.</li>
                    <li> Avoid using inappropriate , offensive images or that do not represent the property.</li>
                    <li> Add high-resolution images of the property, showing both the interior and exterior. </li>
                </ul>
                @endif
                
                <p>Thank you for using our service.</p>
                <p>Darak Team</p>
            </div>
        </div>
    </div>
</body>
</html>
