<?php

namespace Modules\Forum\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Modules\Forum\Entities\Reply;
use Modules\Forum\Entities\Thread;

class ThreadWasUpdated extends Notification
{
    use Queueable;

    /**
     * @var Thread
     */
    protected Thread $thread;

    /**
     * @var Reply
     */
    protected Reply $reply;

    /**
     * Create a new notification instance.
     *
     * @param  Thread $thread
     * @param  Reply $reply
     */
    public function __construct(Thread $thread, Reply $reply)
    {
        $this->thread = $thread;
        $this->reply = $reply;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array
     */
    public function via()
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array
     */
    public function toArray()
    {
        return [
            'message' => $this->reply->owner->full_name . ' a répondu au sujet ' . $this->thread->title,
            'link' => $this->reply->path()
        ];
    }
}