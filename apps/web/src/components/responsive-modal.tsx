import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * レスポンシブなモーダルのプロパティ
 * @property children - モーダル内に表示するコンテンツ
 * @property open - モーダルの表示状態
 * @property title - モーダルのタイトル
 * @property onOpenChange - モーダルの表示状態が変更された時のコールバック
 */
interface ResponsiveModalProps {
	children: React.ReactNode;
	open: boolean;
	title: string;
	onOpenChange: (open: boolean) => void;
}

/**
 * デバイスの画面サイズに応じて適切なモーダルを表示するコンポーネント
 *
 * モバイルの場合はDrawer（下からのスライドイン）、
 * デスクトップの場合はDialog（中央配置のモーダル）を表示します。
 *
 * @param props - {@link ResponsiveModalProps}
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <ResponsiveModal
 *       open={open}
 *       onOpenChange={setOpen}
 *       title="設定"
 *     >
 *       <div>モーダルの内容...</div>
 *     </ResponsiveModal>
 *   );
 * };
 */
export const ResponsiveModal = ({
	children,
	open,
	title,
	onOpenChange,
}: ResponsiveModalProps) => {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<Drawer open={open} onOpenChange={onOpenChange}>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>{title}</DrawerTitle>
					</DrawerHeader>
					{children}
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};
