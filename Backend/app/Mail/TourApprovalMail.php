<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TourApprovalMail extends Mailable
{
    use Queueable, SerializesModels;

    public $tour;
    public $property;
    public $user;
    public $tourDate;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($tour, $property, $user,$tourDate)
    {
        $this->tour = $tour;
        $this->property = $property;
        $this->user = $user;
        $this->tourDate = $tourDate;

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Tour Request Approved',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.tour_approval',
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
