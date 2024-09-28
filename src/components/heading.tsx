import { motion } from "framer-motion";

export default function() {
    return (
        <motion.div className="display-6 d-flex align-items-center" animate={{ y: 0 }} initial={{ y: '-1em' }} transition={{ duration: 1 }}>
            <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 2 }}>
                David Garcia | <span style={{ fontSize: '0.75em' }}>Software Engineer</span>
            </motion.div>
        </motion.div>
    );
}
