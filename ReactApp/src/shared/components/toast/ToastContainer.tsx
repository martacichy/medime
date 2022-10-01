import React, { FC } from "react";
import {
	ToastContainer as ExternalToastContainer,
	ToastContainerProps as ExternalToastContainerProps,
} from "react-toastify";
import { getDefaultToastConfiguration } from "./toastUtils";

export interface ToastContainerProps extends ExternalToastContainerProps {}

export const ToastContainer: FC<ToastContainerProps> = (props) => {
	const toastContainerProps = {
		...getDefaultToastConfiguration(),
		...props,
	};

	return (
		<ExternalToastContainer {...toastContainerProps} className="toastify" />
	);
};
