interface CommentItemProps {
    comment: {
        _id: string;
        text: string;
        name: string;
        createdAt: string;
        updatedAt: string;
    };
}

export default function CommentItem({ comment }: CommentItemProps) {
    const formattedDate = new Date(comment.createdAt).toLocaleDateString();

    return (
        <div className="p-4 rounded-lg border border-gray-600 bg-gray-700">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <span className="font-medium text-gray-200">
                        {comment.name || 'Anonymous'}
                    </span>
                    <span className="text-sm text-gray-400 ml-2">
                        {formattedDate}
                    </span>
                </div>
            </div>
            <p className="text-gray-100">{comment.text}</p>
        </div>
    );
}
