<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PropertyStatusUpdateMail extends Mailable
{
    use Queueable, SerializesModels;

    public $property;
    public $user;
    public $status;
    public $messageContent; // Added for custom message

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($property, $user, $status, $messageContent)
    {
        $this->property = $property;
        $this->user = $user;
        $this->status = $status;
        $this->messageContent = $messageContent; // Initialize the custom message
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Property Status Update',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.property_status_update',
        );
    }


    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
