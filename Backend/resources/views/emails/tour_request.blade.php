<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Tour Request</title>
</head>
<body>
    <div style="background-color: #f3f2f2;">
        <div style="padding: 15px; width: 600px; margin: 20px auto;">
            <h2 style="margin: 0; padding: 15px; border-top-left-radius: 10px; border-top-right-radius: 10px; background-color: #0275d8; color: #ffffff;">
                New Tour Request for Property: {{ $property->title }}
            </h2>
            <div style="margin: 0; padding: 15px; background-color: #ffffff;">
                <p style="text-transform: capitalize">Hi {{ $landlord->first_name }},</p>
                <p>You have received a new tour request for your property: {{ $property->title }}.</p>
                <p><strong>Tour Details:</strong></p>
                <ul>
                    @foreach ($tour->tourDates as $date)
                        <li>{{ $date->date }}</li>
                    @endforeach
                </ul>
                <p>Thank you!</p>
                <p>Darak Team</p>
            </div>
        </div>
    </div>
</body>
</html>
