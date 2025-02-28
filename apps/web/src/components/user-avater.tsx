import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { UserIcon } from "lucide-react";

/**
 * アバター画像のサイズバリアント定義
 * @property default - デフォルトサイズ (36x36px)
 * @property xs - 極小サイズ (16x16px)
 * @property sm - 小サイズ (24x24px)
 * @property md - 中サイズ (32x32px)
 * @property lg - 大サイズ (40x40px)
 * @property xl - 特大サイズ (160x160px)
 */
const avatarVariants = cva("", {
	variants: {
		size: {
			default: "h-9 w-9",
			xs: "h-4 w-4",
			sm: "h-6 w-6",
			md: "h-8 w-8",
			lg: "h-10 w-10",
			xl: "h-[160px] w-[160px]",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

/**
 * ユーザーアバターのプロパティ
 * @property imageUrl - アバター画像のURL
 * @property name - ユーザー名（画像が読み込めない場合のalt属性として使用）
 * @property size - アバターのサイズバリアント
 * @property className - 追加のCSSクラス
 * @property onClick - クリック時のコールバック関数
 */
interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
	imageUrl: string;
	name: string;
	className?: string;
	onClick?: () => void;
}

/**
 * ユーザーアバターを表示するコンポーネント
 *
 * 画像の読み込みに失敗した場合は、ユーザーアイコンをフォールバックとして表示します。
 * サイズはバリアントで制御可能で、クリックイベントにも対応しています。
 *
 * @param props - {@link UserAvatarProps}
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   return (
 *     <UserAvatar
 *       imageUrl="/path/to/avatar.jpg"
 *       name="ユーザー名"
 *       size="lg"
 *       onClick={() => console.log('clicked')}
 *     />
 *   );
 * };
 * ```
 */
export const UserAvatar = ({
	imageUrl,
	name,
	size,
	className,
	onClick,
}: UserAvatarProps) => {
	return (
		<Avatar
			className={cn(avatarVariants({ size, className }))}
			onClick={onClick}
		>
			<AvatarImage src={imageUrl} alt={name} />
			<AvatarFallback>
				<UserIcon className="size-4" />
			</AvatarFallback>
		</Avatar>
	);
};
