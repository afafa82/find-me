import React from "react";
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

export default function ShareNow(props) {
    return (
        <div className="border p-3 mt-3 rounded">
            <h5 className="mb-3">Share Now</h5>
            <FacebookShareButton url={props.shareUrl} quote={props.title}>
                <FacebookIcon size={32} round></FacebookIcon>
            </FacebookShareButton>
            <TwitterShareButton url={props.shareUrl} title={props.title} className="ms-2">
                <TwitterIcon size={32} round></TwitterIcon>
            </TwitterShareButton>
            <TelegramShareButton url={props.shareUrl} title={props.title} className="ms-2">
                <TelegramIcon size={32} round />
            </TelegramShareButton>
            <WhatsappShareButton url={props.shareUrl} title={props.title} separator=":: " className="ms-2">
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={props.shareUrl} className="ms-2">
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
        </div>
    );
}
